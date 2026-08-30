"use client";

import React from "react";
import { BrandDetail } from "@/types/brand.types";

interface BrandDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand?: BrandDetail | null;
}

export const BrandDetailsModal: React.FC<BrandDetailsModalProps> = ({
  isOpen,
  onClose,
  brand,
}) => {
  if (!isOpen) return null;

  const data: BrandDetail = brand || {
    id: "1",
    sl: "1",
    brandName: "NIBBI AI",
    name: "Tamim",
    email: "abc@gmail.com",
    number: "(+33)6 55 53 38 10",
    date: "16 Apr 2024",
    phoneNumber: "+7397386837",
    address: "South Dakota 83475",
    joiningDate: "29 Jun 2025",
    category: "Fashion",
    productUrl: "https:example.com/product-pagett",
    priceDiscount: "10% Off",
    description: "Summer Athletic Collectionashion",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      {/* Modal Container */}
      <div className="relative w-full max-w-[513px] bg-[#FEFEFE] shadow-[0px_4px_29.1px_rgba(0,0,0,0.2)] rounded-[12px] p-6 flex flex-col gap-6">
        {/* Top Header + Close Button */}
        <div className="w-full flex items-center justify-between">
          <h2 className="font-inter text-[24px] font-semibold leading-[29px] text-[#1F1D1D]">
            Brand Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 2 Column Details Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 font-inter text-[14px]">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#575757] text-[16px]">Name</span>
              <span className="font-medium text-[#959595]">{data.name || "Tamim"}</span>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#575757] text-[16px]">Phone Number</span>
              <span className="font-medium text-[#959595]">
                {data.phoneNumber || "+7397386837"}
              </span>
            </div>

            {/* Joining Date */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#575757] text-[16px]">Joining Date</span>
              <span className="font-medium text-[#959595]">
                {data.joiningDate || "29 Jun 2025"}
              </span>
            </div>

            {/* Brand Name */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#575757] text-[16px]">Brand Name</span>
              <span className="font-medium text-[#959595]">
                {data.brandName || "NIBBI AI"}
              </span>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#575757] text-[16px]">Category</span>
              <span className="font-medium text-[#959595]">
                {data.category || "Fashion"}
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#575757] text-[16px]">Email</span>
              <span className="font-medium text-[#959595]">
                {data.email || "abc@gmail.com"}
              </span>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#575757] text-[16px]">Address</span>
              <span className="font-medium text-[#959595]">
                {data.address || "South Dakota 83475"}
              </span>
            </div>

            {/* Product Or Website URL */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#575757] text-[14px] truncate">
                Product Or Website URL
              </span>
              <span className="font-medium text-[#959595] truncate">
                {data.productUrl || "https:example.com/product-pagett"}
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#575757] text-[16px]">Price</span>
              <span className="font-medium text-[#959595]">
                {data.priceDiscount || "10% Off"}
              </span>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#575757] text-[16px]">Description</span>
              <span className="font-medium text-[#959595] truncate">
                {data.description || "Summer Athletic Collectionashion"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Full Row: Product Image + Click here Link */}
        <div className="w-full flex items-end justify-between pt-2 border-t border-gray-100 font-inter text-[14px]">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-[#1F1D1D]">Product Image</span>
            <span className="font-medium text-[#575757] text-[13px]">
              {data.productUrl || "https:example.com/product-pagett"}
            </span>
          </div>

          <a
            href={data.productUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#000000] underline hover:opacity-80 transition-opacity"
          >
            Click here
          </a>
        </div>
      </div>
    </div>
  );
};
