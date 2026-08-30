export interface StatCardData {
  id: string;
  title: string;
  value: string;
}

export interface MonthlyEarning {
  month: string;
  amount: number; // in thousands or exact value
  formattedAmount: string;
}

export interface Transaction {
  id: string;
  transactionId: string;
  userName: string;
  brandName: string;
  amount: string;
  date: string;
}

export type SidebarNavItem =
  | "dashboard"
  | "earnings"
  | "users"
  | "brand"
  | "withdraw-request"
  | "settings"
  | "support"
  | "logout";
