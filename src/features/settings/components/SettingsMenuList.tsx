"use client";

import React from "react";
import { SettingsSubTab } from "@/types/settings.types";

interface SettingsMenuListProps {
  onSelectTab: (tab: SettingsSubTab) => void;
}

export const SettingsMenuList: React.FC<SettingsMenuListProps> = ({
  onSelectTab,
}) => {
  const menuItems: { id: SettingsSubTab; label: string }[] = [
    { id: "personal-info", label: "Personal Information" },
    { id: "change-password", label: "Change Password" },
    { id: "terms", label: "Terms & Condition" },
    { id: "privacy", label: "Privacy Policy" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="w-full bg-[#FEFEFE] rounded-[16px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] p-6 sm:p-8 flex flex-col divide-y divide-gray-100">
      {menuItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelectTab(item.id)}
          className="w-full py-5 px-2 flex items-center justify-between font-inter text-[16px] font-medium text-[#1F1D1D] hover:text-[#3E3EDF] transition-colors cursor-pointer group"
        >
          <span>{item.label}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 group-hover:text-[#3E3EDF] group-hover:translate-x-1 transition-all"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      ))}
    </div>
  );
};
