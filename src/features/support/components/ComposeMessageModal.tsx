"use client";

import React, { useState, useEffect } from "react";

interface ComposeMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: (message: { recipients: string; subject: string; body: string }) => void;
  defaultRecipient?: string;
  defaultSubject?: string;
}

export const ComposeMessageModal: React.FC<ComposeMessageModalProps> = ({
  isOpen,
  onClose,
  onSend,
  defaultRecipient = "",
  defaultSubject = "",
}) => {
  const [recipients, setRecipients] = useState(defaultRecipient);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");

  useEffect(() => {
    if (isOpen) {
      setRecipients(defaultRecipient);
      setSubject(defaultSubject);
      setBody("");
    }
  }, [isOpen, defaultRecipient, defaultSubject]);

  if (!isOpen) return null;

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSend) {
      onSend({ recipients, subject, body });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-[700px] h-[550px] bg-[#FEFEFE] rounded-[16px] shadow-2xl overflow-hidden flex flex-col justify-between border border-gray-200">
        {/* Modal Header */}
        <div className="w-full h-12 px-6 bg-white border-b border-gray-100 flex items-center justify-between font-inter">
          <h3 className="font-medium text-[16px] text-[#1F1D1D]">New Message</h3>
          <div className="flex items-center gap-3 text-gray-500">
            <button type="button" onClick={onClose} className="hover:text-gray-800 cursor-pointer" title="Minimize">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button type="button" onClick={onClose} className="hover:text-gray-800 cursor-pointer" title="Expand">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
            </button>
            <button type="button" onClick={onClose} className="hover:text-red-500 cursor-pointer" title="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        </div>

        {/* Inputs Form */}
        <form onSubmit={handleSendSubmit} className="flex-1 flex flex-col p-6 overflow-y-auto gap-3 font-inter">
          {/* Recipients Row */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <input
              type="text"
              placeholder="Recipients"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              className="w-full outline-none bg-transparent text-[15px] text-[#1F1D1D] placeholder:text-gray-400"
            />
            <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium shrink-0">
              <button type="button" onClick={() => setShowCc(!showCc)} className="hover:text-[#3E3EDF] cursor-pointer">
                Cc
              </button>
              <button type="button" onClick={() => setShowCc(!showCc)} className="hover:text-[#3E3EDF] cursor-pointer">
                Bcc
              </button>
            </div>
          </div>

          {/* Optional CC / BCC input */}
          {showCc && (
            <div className="flex flex-col gap-2 border-b border-gray-100 pb-2">
              <input
                type="text"
                placeholder="Cc"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
                className="w-full outline-none bg-transparent text-[14px] text-[#1F1D1D] placeholder:text-gray-400"
              />
              <input
                type="text"
                placeholder="Bcc"
                value={bcc}
                onChange={(e) => setBcc(e.target.value)}
                className="w-full outline-none bg-transparent text-[14px] text-[#1F1D1D] placeholder:text-gray-400"
              />
            </div>
          )}

          {/* Subject Row */}
          <div className="border-b border-gray-100 pb-2">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full outline-none bg-transparent text-[15px] text-[#1F1D1D] placeholder:text-gray-400"
            />
          </div>

          {/* Body Text */}
          <div className="flex-1 min-h-[180px]">
            <textarea
              placeholder="Body Text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full h-full outline-none bg-transparent text-[15px] text-[#1F1D1D] placeholder:text-gray-400 resize-none pt-2"
            />
          </div>

          {/* Bottom Action Toolbar */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Left: Send Button & Split Arrow + Rich Toolbar Icons */}
            <div className="flex items-center gap-3">
              {/* Send Button Group */}
              <div className="inline-flex rounded-[8px] shadow-sm overflow-hidden bg-[#3E3EDF] hover:bg-[#3232C7] transition-colors">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-white font-medium text-[15px] cursor-pointer"
                >
                  Send
                </button>
                <button
                  type="button"
                  className="px-2 border-l border-white/20 text-white hover:bg-black/10 cursor-pointer"
                  title="Schedule send"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
              </div>

              {/* Rich Editor Toolbar Icons */}
              <div className="flex items-center gap-2 text-gray-500 pl-2">
                <button type="button" className="p-1.5 hover:text-[#3E3EDF] cursor-pointer" title="Formatting Options">
                  <span className="font-bold text-[16px]">A</span>
                </button>
                <button type="button" className="p-1.5 hover:text-[#3E3EDF] cursor-pointer" title="Attach file">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                </button>
                <button type="button" className="p-1.5 hover:text-[#3E3EDF] cursor-pointer" title="Insert link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                </button>
                <button type="button" className="p-1.5 hover:text-[#3E3EDF] cursor-pointer" title="Insert emoji">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
                </button>
                <button type="button" className="p-1.5 hover:text-[#3E3EDF] cursor-pointer" title="Insert photo">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                </button>
              </div>
            </div>

            {/* Right: Trash icon */}
            <div className="flex items-center gap-2 text-gray-400">
              <button type="button" onClick={onClose} className="p-1.5 hover:text-red-500 cursor-pointer" title="Discard draft">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
