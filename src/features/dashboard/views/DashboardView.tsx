"use client";

import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { StatsCards } from "../components/StatsCards";
import { EarningsChart } from "../components/EarningsChart";
import { RecentTransactions } from "../components/RecentTransactions";
import { SidebarNavItem } from "@/types/dashboard.types";
import { useRouter } from "next/navigation";

export const DashboardView = () => {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState<SidebarNavItem>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavSelect = (item: SidebarNavItem) => {
    setActiveNav(item);
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
      {/* Responsive Left Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavSelect={handleNavSelect}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Dashboard Content Area */}
      <main className="flex-1 w-full min-h-screen p-4 sm:p-6 md:p-8 flex flex-col gap-6 items-stretch bg-[#FEFEFE] overflow-x-hidden">
        {/* Header with Mobile Menu Toggle */}
        <Header
          adminName="Tamim"
          adminRole="Admin"
          unreadCount={2}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Stats Summary Cards */}
        <StatsCards />

        {/* Earnings Bar Chart */}
        <EarningsChart />

        {/* Recent Transactions Table */}
        <RecentTransactions />
      </main>
    </div>
  );
};
