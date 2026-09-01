"use client";

import React, { useState } from "react";
import { AddFaqForm, FaqItem } from "./AddFaqForm";

interface FaqViewProps {
  onBack: () => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onBack }) => {
  const [isEditingFaq, setIsEditingFaq] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
  const [error, setError] = useState("");

  const handleSubmitFaq = () => {
    setError(
      "FAQ cannot be saved yet because the backend has no FAQ management API. Required: GET/POST /api/v1/admin/faqs/ and PATCH/DELETE /api/v1/admin/faqs/{faq_id}/."
    );
    setIsEditingFaq(false);
    setSelectedFaq(null);
  };

  if (isEditingFaq) {
    return (
      <AddFaqForm
        initialFaq={selectedFaq}
        onBack={() => {
          setIsEditingFaq(false);
          setSelectedFaq(null);
        }}
        onConfirm={handleSubmitFaq}
      />
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-[#1F1D1D] hover:text-[#3E3EDF] transition-colors cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h2 className="text-[20px] sm:text-[24px] font-medium text-[#1F1D1D]">
            FAQ
          </h2>
        </div>
        <button
          type="button"
          onClick={() => {
            setError("");
            setSelectedFaq(null);
            setIsEditingFaq(true);
          }}
          className="h-[44px] rounded-[8px] bg-[#3E3EDF] px-6 text-[15px] font-medium text-white shadow-md transition-colors hover:bg-[#3232C7]"
        >
          Add FAQ
        </button>
      </div>

      {error && (
        <div className="rounded-[8px] border border-red-100 bg-red-50 px-4 py-3 text-[14px] font-medium text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-[12px] border border-gray-100 bg-white p-6 text-center text-[15px] leading-6 text-[#575757] shadow-[0px_2px_8px_rgba(0,0,0,0.06)]">
        No FAQ records returned because the backend does not provide FAQ list endpoints yet.
      </div>
    </div>
  );
};
