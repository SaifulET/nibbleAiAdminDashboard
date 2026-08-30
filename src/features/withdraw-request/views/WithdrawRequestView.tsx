"use client";

import React, { useState } from "react";
import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { Header } from "@/features/dashboard/components/Header";
import { StatsCards } from "@/features/dashboard/components/StatsCards";
import { WithdrawRequestTable } from "../components/WithdrawRequestTable";
import { WithdrawDetailsModal } from "../components/WithdrawDetailsModal";
import { WithdrawRequestDetail } from "@/types/withdraw-request.types";
import { SidebarNavItem } from "@/types/dashboard.types";
import { useRouter } from "next/navigation";

export const WithdrawRequestView = () => {
  const router = useRouter();
  const [selectedRequest, setSelectedRequest] =
    useState<WithdrawRequestDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleOpenModal = (request: WithdrawRequestDetail) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleApprove = () => {
    setIsModalOpen(false);
  };

  const handleCancelRequest = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FEFEFE]">
      {/* Responsive Sidebar */}
      <Sidebar
        activeNav="withdraw-request"
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

        {/* Stats Cards */}
        <StatsCards />

        {/* Withdraw Request Table */}
        <WithdrawRequestTable onViewRequest={handleOpenModal} />
      </main>

      {/* Withdraw Details Modal */}
      <WithdrawDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
        onApprove={handleApprove}
        onCancelRequest={handleCancelRequest}
      />
    </div>
  );
};
