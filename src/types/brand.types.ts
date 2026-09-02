export interface BrandDetail {
  id: string;
  sl: string;
  brandName: string;
  name?: string;
  email: string;
  number: string;
  date: string;
  phoneNumber?: string;
  address?: string;
  joiningDate?: string;
  category?: string;
  productUrl?: string;
  priceDiscount?: string;
  description?: string;
  status?: string;
  source?: "brand" | "brand-account" | "brand-application";
  canApprove?: boolean;
}

export interface BrandFilterState {
  date: string;
  brandName: string;
}
