"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ApiError,
  ApiRecord,
  backendApi,
  apiClient,
  nibblApi,
  tokenStorage,
} from "@/lib/api/backendApi";
import { BrandDetail } from "@/types/brand.types";
import { MonthlyEarning, StatCardData } from "@/types/dashboard.types";
import { TransactionDetail } from "@/types/earnings.types";
import { UserDetail } from "@/types/users.types";
import { WithdrawRequestDetail, WithdrawStatus } from "@/types/withdraw-request.types";

type LoadState = "idle" | "loading" | "success" | "error";

const listResults = (response: unknown): ApiRecord[] => {
  if (Array.isArray(response)) return response as ApiRecord[];
  if (
    response &&
    typeof response === "object" &&
    Array.isArray((response as { results?: unknown }).results)
  ) {
    return (response as { results: ApiRecord[] }).results;
  }
  return [];
};

const readError = (error: unknown) =>
  error instanceof ApiError
    ? error.message
    : error instanceof Error
      ? error.message
      : "Something went wrong.";

const dateText = (value: unknown) =>
  typeof value === "string" ? new Date(value).toLocaleDateString() : "";

const parseMoney = (value: unknown) => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const money = (value: unknown) => `$${parseMoney(value).toFixed(2)}`;

const shortMoney = (value: number) => {
  if (Math.abs(value) >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return `$${value.toFixed(2)}`;
};

const mapUser = (item: ApiRecord, index: number): UserDetail => ({
  id: String(item.id ?? index),
  sl: String(index + 1),
  userName: String(item.full_name ?? item.name ?? item.email ?? "Unknown"),
  email: String(item.email ?? ""),
  phoneNumber: String(item.phone ?? ""),
  joiningDate: dateText(item.created_at),
  address: String(item.address ?? ""),
});

const mapBrand = (item: ApiRecord, index: number): BrandDetail => ({
  id: String(item.id ?? index),
  sl: String(index + 1),
  brandName: String(item.name ?? item.brand_name ?? "Unknown brand"),
  name: String(item.name ?? item.brand_name ?? ""),
  email: String(item.email ?? item.owner_email ?? ""),
  number: String(item.phone ?? item.phone_number ?? ""),
  date: dateText(item.created_at),
  category: String(item.category ?? ""),
  productUrl: String(item.website ?? ""),
  description: String(item.description ?? ""),
  status: String(item.status ?? "active"),
  source: "brand",
  canApprove: false,
});

const mapBrandAccount = (item: ApiRecord, index: number): BrandDetail => ({
  id: String(item.id ?? index),
  sl: String(index + 1),
  brandName: String(item.full_name ?? item.email ?? "Pending brand account"),
  name: String(item.full_name ?? ""),
  email: String(item.email ?? ""),
  number: String(item.phone ?? item.phone_number ?? ""),
  date: dateText(item.created_at),
  status: "pending approval",
  source: "brand-account",
  canApprove: true,
});

const mapBrandApplication = (item: ApiRecord, index: number): BrandDetail => ({
  id: String(item.id ?? index),
  sl: String(index + 1),
  brandName: String(item.brand_name ?? "Pending brand application"),
  name: String(item.brand_name ?? ""),
  email: String(item.contact_email ?? ""),
  number: "",
  date: dateText(item.created_at),
  productUrl: String(item.website ?? ""),
  description: String(item.message ?? ""),
  status: "pending approval",
  source: "brand-application",
  canApprove: true,
});

const mergeBrandRows = (
  brandList: ApiRecord[],
  userList: ApiRecord[],
  applicationList: ApiRecord[] = []
): BrandDetail[] => {
  const activeBrands = brandList.map(mapBrand);
  const pendingApplications = applicationList
    .filter((item) => String(item.status ?? "").toLowerCase() === "pending")
    .map((item, index) => mapBrandApplication(item, activeBrands.length + index));
  const pendingBrandAccounts = userList
    .filter((item) => String(item.role ?? "").toLowerCase() === "brand" && item.is_approved === false)
    .map((item, index) => mapBrandAccount(item, activeBrands.length + pendingApplications.length + index));

  return [...pendingApplications, ...pendingBrandAccounts, ...activeBrands].map((brand, index) => ({
    ...brand,
    sl: String(index + 1),
  }));
};

const mapTransaction = (item: ApiRecord, index: number): TransactionDetail => ({
  id: String(item.id ?? index),
  transactionId: String(item.id ?? item.transaction_id ?? index),
  userName: String(item.user_email ?? item.user_name ?? item.actor_email ?? item.wallet ?? ""),
  brandName: String(item.brand_name ?? item.category ?? item.wallet_kind ?? item.reference_type ?? ""),
  amount: money(item.amount),
  date: dateText(item.created_at),
  accountNumber: String(item.wallet ?? ""),
  accountHolderName: String(item.user_email ?? item.user_name ?? item.actor_email ?? ""),
  providerName: String(item.category ?? item.wallet_kind ?? ""),
});

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const earningCategories = new Set(["rebate_fee", "review_fee", "subscription"]);

const mapMonthlyEarnings = (items: ApiRecord[]): MonthlyEarning[] => {
  const grouped = new Map<string, number>();

  items.forEach((item) => {
    const category = String(item.category ?? "");
    if (category && !earningCategories.has(category)) return;

    const date = typeof item.created_at === "string" ? new Date(item.created_at) : null;
    if (!date || Number.isNaN(date.getTime())) return;

    const key = `${date.getFullYear()}-${date.getMonth()}`;
    grouped.set(key, (grouped.get(key) || 0) + parseMoney(item.amount));
  });

  const years = new Set<string>();
  grouped.forEach((_, key) => years.add(key.split("-")[0]));
  if (!years.size) years.add(String(new Date().getFullYear()));

  return Array.from(years)
    .sort((a, b) => Number(b) - Number(a))
    .flatMap((year) =>
      months.map((month, monthIndex) => {
        const amount = grouped.get(`${year}-${monthIndex}`) || 0;
        return {
          year,
          month,
          amount,
          formattedAmount: shortMoney(amount),
        };
      })
    );
};

const toWithdrawStatus = (value: unknown): WithdrawStatus => {
  const status = String(value ?? "").toLowerCase();
  if (status === "paid" || status === "approved" || status === "processing") return "Approved";
  if (status === "rejected" || status === "cancelled" || status === "flagged") return "Cancelled";
  return "Pending";
};

const mapWithdrawal = (item: ApiRecord, index: number): WithdrawRequestDetail => ({
  id: String(item.id ?? index),
  sl: String(index + 1),
  userName: String(item.user_email ?? item.user_name ?? item.customer_email ?? ""),
  providerName: String(item.provider ?? ""),
  bankName: String(item.provider ?? "Payout provider"),
  accountType: String(item.provider ?? ""),
  accountNumber: String(item.handle ?? item.payout_method ?? ""),
  withdrawAmount: money(item.amount),
  status: toWithdrawStatus(item.status),
});

interface AdminApiState {
  accessToken: string | null;
  refreshToken: string | null;
  profile: ApiRecord | null;
  overview: ApiRecord | null;
  users: UserDetail[];
  brands: BrandDetail[];
  withdrawals: WithdrawRequestDetail[];
  transactions: TransactionDetail[];
  monthlyEarnings: MonthlyEarning[];
  stats: StatCardData[];
  status: LoadState;
  error: string | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  loadProfile: () => Promise<void>;
  loadDashboard: () => Promise<void>;
  loadUsers: () => Promise<void>;
  loadBrands: () => Promise<void>;
  loadWithdrawals: () => Promise<void>;
  loadTransactions: () => Promise<void>;
  updateProfile: (body: ApiRecord | FormData) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  processWithdrawal: (withdrawalId: string, action: "approve" | "reject") => Promise<void>;
  suspendBrand: (brandId: string) => Promise<void>;
  reactivateBrand: (brandId: string) => Promise<void>;
  approveBrand: (brand: BrandDetail) => Promise<void>;
}

export const useAdminApiStore = create<AdminApiState>()(
  persist(
    (set, get) => ({
      accessToken: tokenStorage.getAccess(),
      refreshToken: tokenStorage.getRefresh(),
      profile: null,
      overview: null,
      users: [],
      brands: [],
      withdrawals: [],
      transactions: [],
      monthlyEarnings: [],
      stats: [],
      status: "idle",
      error: null,
      login: async (email, password, rememberMe = false) => {
        set({ status: "loading", error: null });
        try {
          const tokens = await nibblApi.login({ email, password, remember_me: rememberMe });
          tokenStorage.set(tokens.access, tokens.refresh);
          const profile = await nibblApi.me();
          set({
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
            profile,
            status: "success",
          });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      logout: () => {
        tokenStorage.clear();
        set({ accessToken: null, refreshToken: null, profile: null, error: null, status: "idle" });
      },
      clearError: () => set({ error: null, status: "idle" }),
      loadProfile: async () => {
        const state = get();
        if (state.accessToken && state.refreshToken && !tokenStorage.getAccess()) {
          tokenStorage.set(state.accessToken, state.refreshToken);
        }

        if (!tokenStorage.getAccess() && !state.refreshToken) return;

        try {
          const profile = await nibblApi.me();
          set({ profile, error: null });
        } catch (error) {
          const hasProfile = Boolean(get().profile);
          if (error instanceof ApiError && error.status === 401) {
            get().logout();
            return;
          }
          set({
            status: hasProfile ? "idle" : "error",
            error: hasProfile ? null : readError(error),
          });
        }
      },
      loadDashboard: async () => {
        const state = get();
        if (state.accessToken && state.refreshToken && !tokenStorage.getAccess()) {
          tokenStorage.set(state.accessToken, state.refreshToken);
        }

        set({ status: "loading", error: null });
        try {
          const [profile, overview, users, brands, applications, transactions] = await Promise.all([
            nibblApi.me(),
            apiClient.request<ApiRecord>(backendApi.admin.analyticsOverview),
            apiClient.request<unknown>(backendApi.admin.users),
            apiClient.request<unknown>(backendApi.admin.brands),
            apiClient.request<unknown>(backendApi.admin.brandApplications),
            apiClient.request<unknown>(backendApi.admin.transactions),
          ]);
          const userList = listResults(users);
          const brandList = listResults(brands);
          const applicationList = listResults(applications);
          const transactionList = listResults(transactions);
          set({
            profile,
            overview,
            users: userList.map(mapUser),
            brands: mergeBrandRows(brandList, userList, applicationList),
            transactions: transactionList.map(mapTransaction),
            monthlyEarnings: mapMonthlyEarnings(transactionList),
            stats: [
              { id: "earnings", title: "Total Earnings", value: money(parseMoney(overview.total_fees) + parseMoney(overview.subscription)) },
              { id: "users", title: "Total Users", value: String(overview.users_total ?? userList.length) },
              { id: "brands", title: "Total Brand", value: String(overview.brands_total ?? brandList.length) },
            ],
            status: "success",
          });
        } catch (error) {
          set({ status: "error", error: readError(error) });
        }
      },
      loadUsers: async () => {
        const response = await apiClient.request<unknown>(backendApi.admin.users);
        set({ users: listResults(response).map(mapUser) });
      },
      loadBrands: async () => {
        const [brands, users, applications] = await Promise.all([
          apiClient.request<unknown>(backendApi.admin.brands),
          apiClient.request<unknown>(backendApi.admin.users),
          apiClient.request<unknown>(backendApi.admin.brandApplications),
        ]);
        set({ brands: mergeBrandRows(listResults(brands), listResults(users), listResults(applications)) });
      },
      loadWithdrawals: async () => {
        const response = await apiClient.request<unknown>(backendApi.admin.withdrawals);
        set({ withdrawals: listResults(response).map(mapWithdrawal) });
      },
      loadTransactions: async () => {
        const response = await apiClient.request<unknown>(backendApi.admin.transactions);
        const transactionList = listResults(response);
        set({
          transactions: transactionList.map(mapTransaction),
          monthlyEarnings: mapMonthlyEarnings(transactionList),
        });
      },
      updateProfile: async (body) => {
        set({ status: "loading", error: null });
        try {
          const profile = await nibblApi.updateMe(body);
          set({ profile, status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      changePassword: async (currentPassword, newPassword) => {
        set({ status: "loading", error: null });
        try {
          await nibblApi.changePassword({
            current_password: currentPassword,
            new_password: newPassword,
          });
          set({ status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      forgotPassword: async (email) => {
        set({ status: "loading", error: null });
        try {
          await nibblApi.forgotPassword(email);
          set({ status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      resetPassword: async (email, code, newPassword) => {
        set({ status: "loading", error: null });
        try {
          await nibblApi.resetPassword({
            email,
            code,
            new_password: newPassword,
          });
          set({ status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      processWithdrawal: async (withdrawalId, action) => {
        await apiClient.request(backendApi.admin.withdrawalAction(withdrawalId, action));
        await get().loadWithdrawals();
      },
      suspendBrand: async (brandId) => {
        await apiClient.request(backendApi.admin.suspendBrand(brandId));
        await get().loadBrands();
      },
      reactivateBrand: async (brandId) => {
        await apiClient.request(backendApi.admin.reactivateBrand(brandId));
        await get().loadBrands();
      },
      approveBrand: async (brand) => {
        if (brand.source === "brand-application") {
          await apiClient.request(backendApi.admin.approveBrandApplication(brand.id));
        } else if (brand.source === "brand-account") {
          await apiClient.request(backendApi.admin.approveBrandAccount(brand.id));
        }
        await get().loadBrands();
      },
    }),
    {
      name: "nibbl-admin-api",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        profile: state.profile,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<AdminApiState> | undefined;
        if (persisted?.accessToken && persisted?.refreshToken) {
          tokenStorage.set(persisted.accessToken, persisted.refreshToken);
        }

        return {
          ...currentState,
          accessToken: persisted?.accessToken ?? currentState.accessToken,
          refreshToken: persisted?.refreshToken ?? currentState.refreshToken,
          profile: persisted?.profile ?? currentState.profile,
        };
      },
    }
  )
);
