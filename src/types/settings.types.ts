export type SettingsSubTab =
  | "menu"
  | "personal-info"
  | "change-password";

export interface UserProfileData {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  role: string;
  avatarUrl?: string;
}
