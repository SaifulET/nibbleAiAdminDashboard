"use client";

import React, { useState } from "react";
import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { Header } from "@/features/dashboard/components/Header";
import { InboxList } from "../components/InboxList";
import { ComposeMessageModal } from "../components/ComposeMessageModal";
import { SidebarNavItem } from "@/types/dashboard.types";
import { useRouter } from "next/navigation";

export const SupportView = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeRecipient, setComposeRecipient] = useState("");
  const [composeSubject, setComposeSubject] = useState("");

  const handleOpenCompose = (recipient?: string, subject?: string) => {
    setComposeRecipient(recipient || "");
    setComposeSubject(subject || "");
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
          adminName="Tamim"
          adminRole="Admin"
          unreadCount={2}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Inbox Component with Functional Search & Compose Button */}
        <InboxList onOpenCompose={handleOpenCompose} />
      </main>

      {/* Compose New Message Modal */}
      <ComposeMessageModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        defaultRecipient={composeRecipient}
        defaultSubject={composeSubject}
      />
    </div>
  );
};
