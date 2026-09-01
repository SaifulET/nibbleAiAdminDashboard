"use client";

import React, { useState } from "react";

interface ComposeMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRecipient?: string;
  defaultSubject?: string;
}

export const ComposeMessageModal: React.FC<ComposeMessageModalProps> = ({
  isOpen,
  onClose,
  defaultRecipient = "",
  defaultSubject = "",
}) => {
  const [recipients, setRecipients] = useState(defaultRecipient);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState("");
  const [showCc, setShowCc] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="flex h-[550px] w-full max-w-[700px] flex-col overflow-hidden rounded-[16px] border border-gray-200 bg-[#FEFEFE] shadow-2xl">
        <div className="flex h-12 w-full items-center justify-between border-b border-gray-100 bg-white px-6 font-inter">
          <h3 className="text-[16px] font-medium text-[#1F1D1D]">New Message</h3>
          <div className="flex items-center gap-3 text-gray-500">
            <button type="button" onClick={onClose} className="hover:text-gray-800" title="Minimize">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button type="button" onClick={onClose} className="hover:text-gray-800" title="Expand">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
            <button type="button" onClick={onClose} className="hover:text-red-500" title="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <form className="flex flex-1 flex-col gap-3 overflow-y-auto p-6 font-inter">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <input
              type="text"
              placeholder="Recipients"
              value={recipients}
              onChange={(event) => setRecipients(event.target.value)}
              className="w-full bg-transparent text-[15px] text-[#1F1D1D] outline-none placeholder:text-gray-400"
            />
            <div className="flex shrink-0 items-center gap-2 text-[13px] font-medium text-gray-500">
              <button type="button" onClick={() => setShowCc((visible) => !visible)} className="hover:text-[#3E3EDF]">
                Cc
              </button>
              <button type="button" onClick={() => setShowCc((visible) => !visible)} className="hover:text-[#3E3EDF]">
                Bcc
              </button>
            </div>
          </div>

          {showCc && (
            <div className="flex flex-col gap-2 border-b border-gray-100 pb-2">
              <input type="text" placeholder="Cc" className="w-full bg-transparent text-[14px] text-[#1F1D1D] outline-none placeholder:text-gray-400" />
              <input type="text" placeholder="Bcc" className="w-full bg-transparent text-[14px] text-[#1F1D1D] outline-none placeholder:text-gray-400" />
            </div>
          )}

          <div className="border-b border-gray-100 pb-2">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="w-full bg-transparent text-[15px] text-[#1F1D1D] outline-none placeholder:text-gray-400"
            />
          </div>

          <textarea
            placeholder="Body Text"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="min-h-[220px] flex-1 resize-none bg-transparent pt-2 text-[15px] text-[#1F1D1D] outline-none placeholder:text-gray-400"
          />

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled
                className="rounded-[8px] bg-[#3E3EDF] px-5 py-2.5 text-[15px] font-medium text-white opacity-60"
                title="Support email API is not configured"
              >
                Send
              </button>
              <button type="button" className="p-1.5 text-gray-500 hover:text-[#3E3EDF]" title="Attach file">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
              <button type="button" className="p-1.5 text-gray-500 hover:text-[#3E3EDF]" title="Insert link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </button>
            </div>
            <button type="button" onClick={onClose} className="p-1.5 text-gray-400 hover:text-red-500" title="Discard draft">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
