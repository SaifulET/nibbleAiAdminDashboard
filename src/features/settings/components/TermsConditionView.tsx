"use client";

import React, { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

interface TermsConditionViewProps {
  onBack: () => void;
}

export const TermsConditionView: React.FC<TermsConditionViewProps> = ({
  onBack,
}) => {
  const [error, setError] = useState("");

  const handleSave = () => {
    setError(
      "Terms cannot be saved yet because the backend has no terms content API. Required: GET/PATCH /api/v1/admin/content/terms/."
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
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
          Terms & Conditions
        </h2>
      </div>

      {error && (
        <div className="rounded-[8px] border border-red-100 bg-red-50 px-4 py-3 text-[14px] font-medium text-red-600">
          {error}
        </div>
      )}

      <RichTextEditor initialValue="" onSave={handleSave} />
    </div>
  );
};
