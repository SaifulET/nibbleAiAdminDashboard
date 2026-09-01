"use client";

import React, { useMemo, useState } from "react";
import { EmailMessage } from "@/types/support.types";

interface InboxListProps {
  onOpenCompose: (defaultRecipient?: string, defaultSubject?: string) => void;
}

const emptyMessages: EmailMessage[] = [];

export const InboxList: React.FC<InboxListProps> = ({ onOpenCompose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"unread" | "starred" | "all">("unread");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const messages = emptyMessages;

  const unreadCount = messages.filter((message) => !message.isRead).length;
  const starredCount = messages.filter((message) => message.isStarred).length;

  const filteredMessages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return messages.filter((message) => {
      const matchesSearch =
        !query ||
        message.senderName.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.snippet.toLowerCase().includes(query);

      if (filter === "unread") return matchesSearch && !message.isRead;
      if (filter === "starred") return matchesSearch && message.isStarred;
      return matchesSearch;
    });
  }, [filter, messages, searchQuery]);

  const filterLabel =
    filter === "starred" ? "Starred" : filter === "all" ? "All Emails" : "Email";
  const badgeCount =
    filter === "starred" ? starredCount : filter === "all" ? messages.length : unreadCount;

  return (
    <div className="relative flex w-full flex-col gap-6 font-inter">
      <h2 className="text-[20px] font-medium text-[#1F1D1D] sm:text-[24px]">
        Inbox
      </h2>

      <div className="flex w-full flex-col items-start gap-6 md:flex-row">
        <div className="relative flex w-full shrink-0 flex-col gap-4 md:w-[280px]">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((open) => !open)}
            className="flex h-[48px] w-full items-center justify-between rounded-[12px] border border-gray-200 bg-[#FEFEFE] px-4 text-[15px] font-medium text-[#1F1D1D] shadow-xs transition-colors hover:border-[#3E3EDF]"
          >
            <span className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E27C11" strokeWidth="2">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {filterLabel}
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-5 min-w-6 items-center justify-center rounded-full bg-[#FF5C5C] px-1.5 text-[11px] font-bold text-white">
                {badgeCount}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isDropdownOpen ? "rotate-180" : ""}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 top-[54px] z-30 flex w-full flex-col divide-y divide-gray-50 overflow-hidden rounded-[12px] border border-gray-100 bg-white py-1 shadow-lg">
              {[
                { id: "unread" as const, label: "Unread Emails", count: unreadCount },
                { id: "starred" as const, label: "Starred Emails", count: starredCount },
                { id: "all" as const, label: "All Emails", count: messages.length },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setFilter(item.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-[14px] font-medium transition-colors hover:bg-gray-50 ${
                    filter === item.id ? "text-[#3E3EDF]" : "text-[#1F1D1D]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="flex h-[48px] w-full items-center gap-3 rounded-[12px] border border-gray-200 bg-[#FEFEFE] px-4 shadow-xs transition-colors focus-within:border-[#3E3EDF]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#959595" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search here ..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full bg-transparent text-[14px] text-[#1F1D1D] outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col divide-y divide-gray-50 overflow-hidden rounded-[12px] border border-gray-100 bg-[#FEFEFE] shadow-[0px_2px_8px_rgba(0,0,0,0.06)]">
          {filteredMessages.length === 0 ? (
            <div className="min-h-[540px] p-12 text-center text-[14px] font-medium text-gray-400">
              No emails found
            </div>
          ) : (
            filteredMessages.map((message) => (
              <button
                key={message.id}
                type="button"
                className={`flex w-full items-center justify-between gap-4 border-l-4 px-6 py-4 text-left transition-colors ${
                  message.isRead
                    ? "border-l-transparent bg-white hover:bg-gray-50"
                    : "border-l-[#3E3EDF] bg-gray-50/20 hover:bg-gray-50/60"
                }`}
              >
                <span className="flex min-w-[170px] shrink-0 items-center gap-4">
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                      }
                    }}
                    className="cursor-pointer"
                    aria-label="Star message"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={message.isStarred ? "#F59E0B" : "none"} stroke={message.isStarred ? "#F59E0B" : "#959595"} strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </span>
                  <span className={`truncate text-[14px] ${message.isRead ? "font-normal text-[#575757]" : "font-semibold text-gray-900"}`}>
                    {message.senderName}
                  </span>
                </span>

                <span className="flex-1 truncate text-[14px]">
                  <span className={message.isRead ? "font-medium text-[#1F1D1D]" : "font-semibold text-gray-900"}>
                    {message.subject}
                  </span>
                  <span className="mx-2 font-normal text-gray-400">-</span>
                  <span className="text-[13.5px] font-normal text-gray-500">
                    {message.snippet}
                  </span>
                </span>

                <span className={`shrink-0 text-[12px] font-medium ${message.isRead ? "text-gray-400" : "text-[#3E3EDF]"}`}>
                  {message.time}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpenCompose()}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2.5 rounded-[12px] bg-[#3E3EDF] px-6 py-3.5 text-[15px] font-medium text-white shadow-xl transition-all hover:scale-105 hover:bg-[#3232C7]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
        Compose
      </button>
    </div>
  );
};
