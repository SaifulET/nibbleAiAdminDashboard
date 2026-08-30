"use client";

import React, { useState } from "react";
import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { Header } from "@/features/dashboard/components/Header";
import { SettingsSubTab, UserProfileData } from "@/types/settings.types";
import { SettingsMenuList } from "../components/SettingsMenuList";
import { PersonalInfoView } from "../components/PersonalInfoView";
import { SettingsPasswordFlow } from "../components/SettingsPasswordFlow";
import { TermsConditionView } from "../components/TermsConditionView";
import { PrivacyPolicyView } from "../components/PrivacyPolicyView";
import { FaqView } from "../components/FaqView";
import { SidebarNavItem } from "@/types/dashboard.types";
import { useRouter } from "next/navigation";

export const SettingsView = () => {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<SettingsSubTab>("menu");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfileData>({
    name: "Tamim",
    email: "gddvc@gmail.com",
    countryCode: "+1242",
    phoneNumber: "5735353",
    role: "Admin",
  });

  const handleNavSelect = (item: SidebarNavItem) => {
    switch (item) {
      case "dashboard":
        router.push("/dashboard");
        break;
      case "earnings":
        router.push("/earnings");
        break;
      case "users":
        router.push("/users");
        break;
      case "brand":
        router.push("/brand");
        break;
      case "withdraw-request":
        router.push("/withdraw-request");
        break;
      case "settings":
        router.push("/settings");
        break;
      case "support":
        router.push("/support");
        break;
      case "logout":
        router.push("/");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FEFEFE]">
      {/* Responsive Sidebar */}
      <Sidebar
        activeNav="settings"
        onNavSelect={handleNavSelect}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full min-h-screen p-4 sm:p-6 md:p-8 flex flex-col gap-6 items-stretch bg-[#FEFEFE] overflow-x-hidden">
        {/* Header */}
        <Header
          adminName={userProfile.name}
          adminRole={userProfile.role}
          unreadCount={2}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Dynamic Sub-Tab Views */}
        {activeSubTab === "menu" && (
          <SettingsMenuList onSelectTab={(tab) => setActiveSubTab(tab)} />
        )}

        {activeSubTab === "personal-info" && (
          <PersonalInfoView
            initialProfile={userProfile}
            onBack={() => setActiveSubTab("menu")}
            onSaveProfile={(updated) => setUserProfile(updated)}
          />
        )}

        {activeSubTab === "change-password" && (
          <SettingsPasswordFlow onBackToMenu={() => setActiveSubTab("menu")} />
        )}

        {activeSubTab === "terms" && (
          <TermsConditionView onBack={() => setActiveSubTab("menu")} />
        )}

        {activeSubTab === "privacy" && (
          <PrivacyPolicyView onBack={() => setActiveSubTab("menu")} />
        )}

        {activeSubTab === "faq" && (
          <FaqView onBack={() => setActiveSubTab("menu")} />
        )}
      </main>
    </div>
  );
};
