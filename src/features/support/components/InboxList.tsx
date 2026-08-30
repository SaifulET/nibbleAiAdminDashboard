"use client";

import React, { useState } from "react";
import { EmailMessage } from "@/types/support.types";
import { EmailDetailsModal } from "./EmailDetailsModal";

interface InboxListProps {
  onOpenCompose: (defaultRecipient?: string, defaultSubject?: string) => void;
}

export const InboxList: React.FC<InboxListProps> = ({ onOpenCompose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("unread");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [messages, setMessages] = useState<EmailMessage[]>([
    {
      id: "1",
      senderName: "Nelson Lane",
      senderEmail: "nelson.lane@example.com",
      subject: "Custom Integrations Query",
      snippet: "Query about custom integrations for marketing dashboard",
      body: "Hi Team,\n\nI hope you're doing well. I'm currently looking into integrating NibblAI into our marketing dashboard. Do you provide custom webhook support or a direct API endpoint for real-time campaign performance analytics?\n\nBest regards,\nNelson Lane",
      time: "12:30 PM",
      date: "Aug 30, 2026",
      isStarred: false,
      isRead: false,
      category: "Email",
    },
    {
      id: "2",
      senderName: "Sarah Connor",
      senderEmail: "sarah.c@cyberdyne.io",
      subject: "URGENT: Database Server Upgrade",
      snippet: "Database server upgrade schedule confirmation needed",
      body: "Hello Admin,\n\nWe need to schedule a critical upgrade for our PostgreSQL instance this weekend to improve query performance. The window will be Sunday 2:00 AM - 4:00 AM UTC. Please verify if this matches our SLA agreements.\n\nThanks,\nSarah Connor\nCyberdyne Systems",
      time: "11:15 AM",
      date: "Aug 30, 2026",
      isStarred: true,
      isRead: false,
      category: "Email",
    },
    {
      id: "3",
      senderName: "John Doe",
      senderEmail: "johndoe@acme.org",
      subject: "Partnership Inquiry - NibblAI",
      snippet: "Partnership inquiry with NibblAI analytics engine",
      body: "Greetings,\n\nI'm the head of product at ACME Corp. We are launching a new marketing automation tool and are highly interested in licensing or partnering with NibblAI for backend predictive analytics. Who would be the best contact to schedule a quick 15-minute demo?\n\nSincerely,\nJohn Doe",
      time: "09:45 AM",
      date: "Aug 30, 2026",
      isStarred: false,
      isRead: false,
      category: "Email",
    },
    {
      id: "4",
      senderName: "Elena Rostova",
      senderEmail: "elena.rostova@techhub.net",
      subject: "Feedback on Withdraw Flow UI",
      snippet: "Feedback on the new withdraw request flow ui",
      body: "Hi,\n\nJust completed a test payout via the brand dashboard. The new withdraw request interface is extremely clean, but I noticed a slight layout shift in the 'Approve' modal on mobile resolutions (specifically under 375px width). It would be awesome if this could be adjusted.\n\nBest,\nElena",
      time: "Yesterday",
      date: "Aug 29, 2026",
      isStarred: false,
      isRead: false,
      category: "Email",
    },
    {
      id: "5",
      senderName: "Marcus Aurelius",
      senderEmail: "marcus@stoicmind.com",
      subject: "Premium Tiers and Billing",
      snippet: "Inquiry about premium subscription tiers and billing",
      body: "Hello Support,\n\nCould you send over the detailed documentation for corporate subscription pricing plans? We are looking to scale our active users count from 50 to 500 next month and want to estimate our monthly budget beforehand.\n\nPeace,\nMarcus Aurelius",
      time: "Yesterday",
      date: "Aug 29, 2026",
      isStarred: false,
      isRead: false,
      category: "Email",
    },
    {
      id: "6",
      senderName: "Alex Mercer",
      senderEmail: "alex.mercer@gentek.org",
      subject: "Bug Report: Chart Lag",
      snippet: "Brand page chart rendering lag on safari mobile",
      body: "Team,\n\nThere is a noticeable frame rate drop/lag when interacting with the main Earnings SVG chart on Safari Mobile (iOS 17.4). It works perfectly on Chrome and Desktop. I suspect the animation library is causing unnecessary reflows.\n\nRegards,\nAlex Mercer",
      time: "Yesterday",
      date: "Aug 29, 2026",
      isStarred: true,
      isRead: false,
      category: "Email",
    },
    {
      id: "7",
      senderName: "Clara Oswald",
      senderEmail: "clara.o@tardis.co.uk",
      subject: "Admin Contact Email Change",
      snippet: "Request to change admin email and contact details",
      body: "Hello,\n\nI need to transfer my admin account's primary email from clara.o@tardis.co.uk to clerk.oswald@gmail.com. Could you please trigger the verification links or assist with this manual update?\n\nCheers,\nClara",
      time: "Aug 28",
      date: "Aug 28, 2026",
      isStarred: false,
      isRead: false,
      category: "Email",
    },
    {
      id: "8",
      senderName: "Bruce Wayne",
      senderEmail: "bruce@waynecorp.com",
      subject: "Strategic Data Partnership",
      snippet: "Investment opportunity and strategic data partnership",
      body: "To the Executives,\n\nWayne Enterprises is evaluating data analytics providers for our new Smart City initiative. We are impressed by NibblAI's admin layout and dashboard responsiveness. I would like to set up a private meeting with your core leadership team to discuss a long-term contract.\n\nSent from Wayne Mobile,\nBruce Wayne",
      time: "Aug 28",
      date: "Aug 28, 2026",
      isStarred: false,
      isRead: false,
      category: "Email",
    },
    {
      id: "9",
      senderName: "Diana Prince",
      senderEmail: "diana@themyscira.gov",
      subject: "Security Audit and Compliance",
      snippet: "Security audit check and compliance certificate request",
      body: "Greetings,\n\nWe require the latest SOC2 Type II compliance reports and security check audits of NibblAI's hosting servers. Our compliance guidelines require all cloud integrations to be audited yearly. Please attach the relevant PDF files.\n\nWarm regards,\nDiana Prince",
      time: "Aug 27",
      date: "Aug 27, 2026",
      isStarred: false,
      isRead: false,
      category: "Email",
    },
    {
      id: "10",
      senderName: "Peter Parker",
      senderEmail: "peter.parker@dailybugle.com",
      subject: "Daily Bugle Press Inquiry",
      snippet: "Press inquiry regarding NibblAI's growth trajectory",
      body: "Hi support team!\n\nI am writing a story for the Daily Bugle's business tech column covering the rapid expansion of AI-driven dashboards. I'd love to ask your product lead a few quick questions about the technology stack and user retention numbers.\n\nBest,\nPeter Parker",
      time: "Aug 27",
      date: "Aug 27, 2026",
      isStarred: false,
      isRead: false,
      category: "Email",
    },
    {
      id: "11",
      senderName: "Tony Stark",
      senderEmail: "tony@starkindustries.com",
      subject: "API Rate Limits Optimization",
      snippet: "Suggestions for optimizing dashboard backend API calls",
      body: "Listen,\n\nYour dashboard is querying the transaction status endpoint every 5 seconds. That is incredibly inefficient. You should switch to Server-Sent Events (SSE) or WebSockets. I've sketched a prototype for your backend developers if they want a clean solution. Let me know.\n\nStark,\nTony Stark",
      time: "Aug 26",
      date: "Aug 26, 2026",
      isStarred: false,
      isRead: true,
      category: "Email",
    },
    {
      id: "12",
      senderName: "Steve Rogers",
      senderEmail: "steve.rogers@avengers.org",
      subject: "Weekly Community Manager Report",
      snippet: "Weekly community manager report - August 2026",
      body: "Hi Admin,\n\nEverything is stable this week. User reports are down 15% and active engagement is up. I've updated the shared spreadsheet. Have a great weekend!\n\nBest,\nSteve Rogers",
      time: "Aug 25",
      date: "Aug 25, 2026",
      isStarred: false,
      isRead: true,
      category: "Email",
    },
    {
      id: "13",
      senderName: "Natasha Romanoff",
      senderEmail: "natasha@shield.gov",
      subject: "Access Logs Security Request",
      snippet: "Access logs request for security clearance audit",
      body: "Officer,\n\nWe need the access logs for IP block 192.168.10.x starting from August 20th for a standard review. Please verify that all operations are compliant with our privacy policy.\n\nNatasha",
      time: "Aug 24",
      date: "Aug 24, 2026",
      isStarred: false,
      isRead: true,
      category: "Email",
    },
    {
      id: "14",
      senderName: "Bruce Banner",
      senderEmail: "bruce.banner@gamma.edu",
      subject: "Gamma Research Integration Proposal",
      snippet: "Data visualization layout improvement proposal",
      body: "Hi Team,\n\nThe new dark theme colors used in the SVG chart are highly readable, but we should add screen-reader aria-labels for accessibility. I've written the suggested properties inside a draft text file. Let me know where I can upload it.\n\nBruce",
      time: "Aug 23",
      date: "Aug 23, 2026",
      isStarred: false,
      isRead: true,
      category: "Email",
    },
    {
      id: "15",
      senderName: "Wanda Maximoff",
      senderEmail: "wanda.m@westview.org",
      subject: "Password Reset Link Expiration",
      snippet: "Question about password reset link expiration time",
      body: "Hello Admin,\n\nI was traveling and missed the password reset window. Does the link expire in 24 hours or 1 hour? I need to get back into the panel as soon as possible. Can you trigger a fresh email link?\n\nSincerely,\nWanda",
      time: "Aug 22",
      date: "Aug 22, 2026",
      isStarred: false,
      isRead: true,
      category: "Email",
    },
    {
      id: "16",
      senderName: "Clinton Barton",
      senderEmail: "clint.barton@archery.org",
      subject: "Notification System Test",
      snippet: "Testing the notification system email dispatch",
      body: "Hi,\n\nThis is a test message to verify the support page's visual appearance and email dispatch templates. Ignore this message if everything looks correct in the layout.\n\nCheers,\nClint",
      time: "Aug 21",
      date: "Aug 21, 2026",
      isStarred: false,
      isRead: true,
      category: "Email",
    },
  ]);

  const handleToggleStar = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          const updated = { ...msg, isStarred: !msg.isStarred };
          if (selectedEmail && selectedEmail.id === id) {
            setSelectedEmail(updated);
          }
          return updated;
        }
        return msg;
      })
    );
  };

  const handleToggleRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          const updated = { ...msg, isRead: !msg.isRead };
          if (selectedEmail && selectedEmail.id === id) {
            setSelectedEmail(updated);
          }
          return updated;
        }
        return msg;
      })
    );
  };

  const handleEmailClick = (msg: EmailMessage) => {
    setSelectedEmail(msg);
    setIsDetailsOpen(true);
    if (!msg.isRead) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
      );
      setSelectedEmail({ ...msg, isRead: true });
    }
  };

  const handleReply = (recipient: string, subject: string) => {
    setIsDetailsOpen(false);
    onOpenCompose(recipient, subject);
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;
  const starredCount = messages.filter((m) => m.isStarred).length;
  const totalCount = messages.length;

  const getBadgeCount = () => {
    if (filter === "unread") return unreadCount;
    if (filter === "starred") return starredCount;
    return totalCount;
  };

  const getFilterLabel = () => {
    if (filter === "unread") return "Email";
    if (filter === "starred") return "Starred";
    return "All Emails";
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.body.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "unread") {
      return matchesSearch && !msg.isRead;
    }
    if (filter === "starred") {
      return matchesSearch && msg.isStarred;
    }
    return matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-6 font-inter relative">
      {/* Title */}
      <h2 className="text-[20px] sm:text-[24px] font-medium text-[#1F1D1D]">
        Inbox
      </h2>

      {/* Main Inbox Layout (2 Columns) */}
      <div className="w-full flex flex-col md:flex-row gap-6 items-start">
        {/* Left Filter & Search Column */}
        <div className="w-full md:w-[280px] flex flex-col gap-4 shrink-0 relative">
          {/* Category Dropdown Pill */}
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full h-[48px] px-4 bg-[#FEFEFE] border border-gray-200 hover:border-[#3E3EDF] transition-colors rounded-[12px] shadow-xs flex items-center justify-between font-medium text-[15px] text-[#1F1D1D] cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E27C11" strokeWidth="2">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{getFilterLabel()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-6 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center transition-colors ${filter === "unread" ? "bg-[#FF5C5C]" : filter === "starred" ? "bg-amber-500" : "bg-[#3E3EDF]"}`}>
                {getBadgeCount()}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`text-gray-400 group-hover:text-[#3E3EDF] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Category Dropdown Menu */}
          {isDropdownOpen && (
            <>
              {/* Overlay to close on outside click */}
              <div
                className="fixed inset-0 z-20 cursor-default"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute top-[54px] left-0 w-full bg-white border border-gray-100 rounded-[12px] shadow-lg z-30 py-1.5 overflow-hidden flex flex-col divide-y divide-gray-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    setFilter("unread");
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center justify-between text-[14px] font-medium hover:bg-gray-50 transition-colors cursor-pointer text-left ${filter === "unread" ? "text-[#3E3EDF] bg-gray-50/50" : "text-[#1F1D1D]"}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C5C]" />
                    <span>Unread Emails</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#FF5C5C]/10 text-[#FF5C5C] text-[11px] font-bold">
                    {unreadCount}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilter("starred");
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center justify-between text-[14px] font-medium hover:bg-gray-50 transition-colors cursor-pointer text-left ${filter === "starred" ? "text-[#3E3EDF] bg-gray-50/50" : "text-[#1F1D1D]"}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Starred Emails</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[11px] font-bold">
                    {starredCount}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilter("all");
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center justify-between text-[14px] font-medium hover:bg-gray-50 transition-colors cursor-pointer text-left ${filter === "all" ? "text-[#3E3EDF] bg-gray-50/50" : "text-[#1F1D1D]"}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3E3EDF]" />
                    <span>All Emails</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-bold">
                    {totalCount}
                  </span>
                </button>
              </div>
            </>
          )}

          {/* Search Input Box */}
          <div className="w-full h-[48px] px-4 bg-[#FEFEFE] border border-gray-200 rounded-[12px] shadow-xs flex items-center gap-3 focus-within:border-[#3E3EDF] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#959595" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search here ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-[14px] text-[#1F1D1D] placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right Messages List Column */}
        <div className="flex-1 w-full bg-[#FEFEFE] border border-gray-100 rounded-[12px] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col divide-y divide-gray-50">
          {filteredMessages.length === 0 ? (
            <div className="p-12 text-center text-gray-400 font-medium">
              No messages found matching &quot;{searchQuery}&quot;
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleEmailClick(msg)}
                className={`w-full px-6 py-4 flex items-center justify-between gap-4 border-l-4 transition-all duration-150 cursor-pointer group ${
                  !msg.isRead
                    ? "border-l-[#3E3EDF] bg-gray-50/20 hover:bg-gray-50/50"
                    : "border-l-transparent hover:bg-gray-50/80 bg-white"
                }`}
              >
                {/* Star + Sender Name */}
                <div className="flex items-center gap-4 min-w-[170px] shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStar(msg.id);
                    }}
                    className="cursor-pointer transition-transform active:scale-125"
                    aria-label="Star message"
                  >
                    {msg.isStarred ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#959595" strokeWidth="1.5" className="hover:stroke-[#F59E0B]">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )}
                  </button>
                  <span className={`text-[14px] truncate transition-colors ${!msg.isRead ? "font-semibold text-gray-900" : "font-normal text-[#575757]"}`}>
                    {msg.senderName}
                  </span>
                </div>

                {/* Message Subject & Snippet */}
                <div className="flex-1 truncate text-[14px]">
                  <span className={`transition-colors ${!msg.isRead ? "font-semibold text-gray-900" : "font-medium text-[#1F1D1D]"}`}>
                    {msg.subject}
                  </span>
                  <span className="text-gray-400 font-normal mx-2">-</span>
                  <span className="text-gray-500 font-normal text-[13.5px]">
                    {msg.snippet}
                  </span>
                </div>

                {/* Time */}
                <div className={`text-[12px] font-medium shrink-0 ${!msg.isRead ? "text-[#3E3EDF]" : "text-gray-400"}`}>
                  {msg.time}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Bottom-Right Compose Button */}
      <button
        type="button"
        onClick={() => onOpenCompose()}
        className="fixed bottom-8 right-8 z-45 bg-[#3E3EDF] hover:bg-[#3232C7] text-white font-medium text-[15px] px-6 py-3.5 rounded-[12px] shadow-xl flex items-center gap-2.5 cursor-pointer transition-all hover:scale-105"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        <span>Compose</span>
      </button>

      {/* Email Details Modal */}
      <EmailDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        message={selectedEmail}
        onReply={handleReply}
        onToggleStar={handleToggleStar}
        onToggleRead={handleToggleRead}
      />
    </div>
  );
};
