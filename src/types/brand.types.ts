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
}

export interface BrandFilterState {
  date: string;
  brandName: string;
}
