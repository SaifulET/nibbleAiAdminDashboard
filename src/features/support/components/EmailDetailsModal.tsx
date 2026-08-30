"use client";

import React from "react";
import { EmailMessage } from "@/types/support.types";

interface EmailDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: EmailMessage | null;
  onReply?: (recipient: string, subject: string) => void;
  onToggleStar?: (id: string) => void;
  onToggleRead?: (id: string) => void;
}

export const EmailDetailsModal: React.FC<EmailDetailsModalProps> = ({
  isOpen,
  onClose,
  message,
  onReply,
  onToggleStar,
  onToggleRead,
}) => {
  if (!isOpen || !message) return null;

  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleReplyClick = () => {
    if (onReply) {
      // Prepend "Re: " to subject if it doesn't already have it
      const replySubject = message.subject.startsWith("Re:")
        ? message.subject
        : `Re: ${message.subject}`;
      onReply(message.senderEmail, replySubject);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-[750px] h-[600px] bg-[#FEFEFE] rounded-[16px] shadow-2xl overflow-hidden flex flex-col justify-between border border-gray-200 font-inter">
        {/* Modal Header */}
        <div className="w-full h-14 px-6 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <span className="text-[12px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gray-100 text-gray-600 rounded-[4px]">
              {message.category}
            </span>
          </div>
          
          {/* Action Toolbar */}
          <div className="flex items-center gap-4 text-gray-500">
            {/* Toggle Star */}
            <button
              type="button"
              onClick={() => onToggleStar && onToggleStar(message.id)}
              className="p-1.5 hover:bg-gray-100 rounded-full hover:text-amber-500 transition-colors cursor-pointer"
              title={message.isStarred ? "Unstar message" : "Star message"}
            >
              {message.isStarred ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              )}
            </button>

            {/* Toggle Read/Unread */}
            <button
              type="button"
              onClick={() => onToggleRead && onToggleRead(message.id)}
              className="p-1.5 hover:bg-gray-100 rounded-full hover:text-[#3E3EDF] transition-colors cursor-pointer"
              title={message.isRead ? "Mark as unread" : "Mark as read"}
            >
              {message.isRead ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              )}
            </button>

            {/* Divider */}
            <span className="w-px h-5 bg-gray-200" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full hover:text-red-500 transition-colors cursor-pointer"
              title="Close details"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Main Scrollable Details Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
          {/* Subject Line */}
          <div>
            <h2 className="text-[22px] font-semibold text-[#1F1D1D] leading-tight">
              {message.subject}
            </h2>
          </div>

          {/* Sender & Timestamp Info */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div className="flex items-center gap-3">
              {/* Initial Circle Avatar with Sleek Gradient */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#3E3EDF] to-[#5C5CFF] text-white flex items-center justify-center font-bold text-[15px] shadow-sm shrink-0">
                {getInitials(message.senderName)}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[15px] text-[#1F1D1D]">
                  {message.senderName}
                </span>
                <span className="text-[13px] text-gray-500 font-medium">
                  {message.senderEmail}
                </span>
              </div>
            </div>
            
            {/* Timestamp Column */}
            <div className="flex flex-col items-end text-[12px] text-gray-400">
              <span className="font-medium text-[#1F1D1D]">{message.time}</span>
              <span>{message.date}</span>
            </div>
          </div>

          {/* Email Body Content */}
          <div className="flex-1 text-[15px] text-[#4F4F4F] leading-relaxed whitespace-pre-line font-normal pr-2">
            {message.body}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="w-full h-20 px-8 bg-white border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-transparent border border-gray-200 hover:bg-gray-50 text-[#575757] font-medium text-[14px] rounded-[8px] cursor-pointer transition-colors"
          >
            Close
          </button>
          
          <button
            type="button"
            onClick={handleReplyClick}
            className="px-6 py-2.5 bg-[#3E3EDF] hover:bg-[#3232C7] text-white font-medium text-[14px] rounded-[8px] shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 17 4 12 9 7" />
              <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
            </svg>
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
};
