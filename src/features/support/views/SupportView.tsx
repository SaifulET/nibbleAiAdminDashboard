"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { Header } from "@/features/dashboard/components/Header";
import { InboxList } from "../components/InboxList";
import { ComposeMessageModal } from "../components/ComposeMessageModal";
import { SidebarNavItem } from "@/types/dashboard.types";
import { useRouter } from "next/navigation";
import { useAdminApiStore } from "@/stores/useAdminApiStore";

export const SupportView = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeKey, setComposeKey] = useState(0);
  const [composeRecipient, setComposeRecipient] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const { profile, loadProfile, logout } = useAdminApiStore();

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const handleOpenCompose = (recipient?: string, subject?: string) => {
    setComposeRecipient(recipient || "");
    setComposeSubject(subject || "");
    setComposeKey((key) => key + 1);
    setIsComposeOpen(true);
  };

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
        logout();
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
        activeNav="support"
        onNavSelect={handleNavSelect}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full min-h-screen p-4 sm:p-6 md:p-8 flex flex-col gap-6 items-stretch bg-[#FEFEFE] overflow-x-hidden">
        {/* Header */}
        <Header
          adminName={String(profile?.full_name || profile?.email || "Admin")}
          adminRole={String(profile?.role || "Admin")}
          unreadCount={0}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          onNotificationClick={() => router.push("/support")}
          onProfileClick={() => router.push("/settings")}
        />

        <InboxList onOpenCompose={handleOpenCompose} />
      </main>

      <ComposeMessageModal
        key={composeKey}
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        defaultRecipient={composeRecipient}
        defaultSubject={composeSubject}
      />
    </div>
  );
};
