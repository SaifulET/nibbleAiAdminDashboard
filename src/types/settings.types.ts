export type SettingsSubTab =
  | "menu"
  | "personal-info"
  | "change-password"
  | "terms"
  | "privacy"
  | "faq";

export interface UserProfileData {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  role: string;
  avatarUrl?: string;
}
