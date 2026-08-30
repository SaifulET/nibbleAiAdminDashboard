"use client";

import React, { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

interface TermsConditionViewProps {
  onBack: () => void;
}

export const TermsConditionView: React.FC<TermsConditionViewProps> = ({
  onBack,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(
    `Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar.\n\nLorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant.`
  );
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSave = (newContent: string) => {
    setContent(newContent);
    setIsEditing(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3500);
  };

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="text-[#1F1D1D] hover:text-[#3E3EDF] transition-colors cursor-pointer"
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
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h2 className="text-[20px] sm:text-[24px] font-medium text-[#1F1D1D]">
          Terms & Conditions
        </h2>
      </div>

      {/* Success Notification */}
      {showSuccessToast && (
        <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-[8px] font-medium text-[14px] flex items-center justify-between shadow-xs">
          <span>Terms & Conditions updated successfully!</span>
          <button
            type="button"
            onClick={() => setShowSuccessToast(false)}
            className="text-emerald-600 hover:text-emerald-900 cursor-pointer"
          >
            &times;
          </button>
        </div>
      )}

      {/* Main View Mode vs Edit Mode */}
      {isEditing ? (
        <RichTextEditor initialValue={content} onSave={handleSave} />
      ) : (
        <div className="w-full flex flex-col gap-8">
          <div className="w-full text-[#575757] text-[15px] leading-[170%] space-y-4 font-normal whitespace-pre-line">
            {content}
          </div>

          {/* Bottom Edit Button */}
          <div className="w-full flex justify-end pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="h-[48px] px-12 bg-[#3E3EDF] hover:bg-[#3232C7] text-white font-medium text-[16px] rounded-[8px] shadow-md transition-colors cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
