"use client";

import React from "react";

interface HeaderProps {
  adminName?: string;
  adminRole?: string;
  unreadCount?: number;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  adminName = "Tamim",
  adminRole = "Admin",
  unreadCount = 2,
  onToggleMobileMenu,
}) => {
  return (
    <header className="w-full min-h-[78px] bg-white rounded-[16px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shrink-0 flex-wrap sm:flex-nowrap">
      {/* Left: Mobile Hamburger Button & Welcome Message */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle Button */}
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="p-2 text-[#3E3EDF] hover:bg-[#3E3EDF]/10 rounded-lg lg:hidden cursor-pointer"
            aria-label="Open mobile menu"
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
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        {/* Welcome Message */}
        <div className="flex flex-col justify-center">
          <h1 className="font-inter text-[20px] sm:text-[24px] font-medium leading-[26px] sm:leading-[29px] text-[#3E3EDF]">
            Welcome,{adminName}
          </h1>
          <p className="font-inter text-[14px] sm:text-[16px] font-normal leading-[19px] text-[#575757]">
            Have a nice day!
          </p>
        </div>
      </div>

      {/* Right Controls: Notifications & Profile */}
      <div className="flex items-center gap-4 sm:gap-6 ml-auto">
        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E0E0E0] flex items-center justify-center transition-colors hover:bg-[#D5D5D5]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3E3EDF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#3E3EDF] text-white font-inter text-[12px] font-medium flex items-center justify-center shadow-sm">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Profile Avatar & Info */}
        <div className="flex items-center gap-3">
          {/* Avatar Circle */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#3E3EDF] bg-gradient-to-br from-[#3E3EDF]/20 to-[#3E3EDF]/40 flex items-center justify-center font-inter font-semibold text-[#3E3EDF] text-base sm:text-lg overflow-hidden shrink-0">
            {adminName.slice(0, 2).toUpperCase()}
          </div>

          <div className="hidden sm:flex flex-col justify-center">
            <span className="font-inter text-[16px] font-normal leading-[19px] text-[#575757]">
              {adminName}
            </span>
            <span className="font-inter text-[14px] font-normal leading-[17px] text-[#575757]">
              {adminRole}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
