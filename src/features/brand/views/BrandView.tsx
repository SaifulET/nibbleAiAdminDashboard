"use client";

import React, { useState } from "react";
import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { Header } from "@/features/dashboard/components/Header";
import { StatsCards } from "@/features/dashboard/components/StatsCards";
import { BrandListTable } from "../components/BrandListTable";
import { BrandDetailsModal } from "../components/BrandDetailsModal";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { BrandDetail } from "@/types/brand.types";
import { SidebarNavItem } from "@/types/dashboard.types";
import { useRouter } from "next/navigation";

export const BrandView = () => {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<BrandDetail | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const handleViewBrand = (brand: BrandDetail) => {
    setSelectedBrand(brand);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteBrand = (brand: BrandDetail) => {
    setSelectedBrand(brand);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedBrand(null);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FEFEFE]">
      {/* Responsive Sidebar */}
      <Sidebar
        activeNav="brand"
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

        {/* Brand List Table with Filter & Actions */}
        <BrandListTable
          onViewBrand={handleViewBrand}
          onDeleteBrand={handleDeleteBrand}
        />
      </main>

      {/* Brand Details Modal */}
      <BrandDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        brand={selectedBrand}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
