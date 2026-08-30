"use client";

import React, { useState } from "react";
import { AddFaqForm, FaqItem } from "./AddFaqForm";

interface FaqViewProps {
  onBack: () => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onBack }) => {
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      id: "1",
      question: "Where can I find ongoing offers and deals?",
      answer: "Can I use the app offline inside a store?",
    },
    {
      id: "2",
      question: "What should I do if a QR code doesn't scan properly?",
      answer: "Make sure your camera lens is clean and your device is connected to the internet. If the issue persists, try restarting the app.",
    },
    {
      id: "3",
      question: "How do I contact support if I face a problem?",
      answer: "You can reach out to our support team via the Support section in the sidebar or send an email to support@nibblai.com.",
    },
    {
      id: "4",
      question: "Is my personal information safe?",
      answer: "Yes, all your personal information is stored securely with enterprise-grade encryption.",
    },
  ]);

  const [openId, setOpenId] = useState<string | null>("1");
  const [activeFormState, setActiveFormState] = useState<
    "list" | "add" | "edit"
  >("list");
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleDelete = (id: string) => {
    setFaqs(faqs.filter((item) => item.id !== id));
  };

  const handleEditClick = (faq: FaqItem) => {
    setEditingFaq(faq);
    setActiveFormState("edit");
  };

  const handleConfirmForm = (data: {
    question: string;
    answer: string;
    id?: string;
  }) => {
    if (data.id) {
      // Edit existing
      setFaqs(
        faqs.map((item) =>
          item.id === data.id
            ? { ...item, question: data.question, answer: data.answer }
            : item
        )
      );
    } else {
      // Add new
      const newFaq: FaqItem = {
        id: Date.now().toString(),
        question: data.question,
        answer: data.answer,
      };
      setFaqs([...faqs, newFaq]);
      setOpenId(newFaq.id);
    }
    setActiveFormState("list");
    setEditingFaq(null);
  };

  if (activeFormState === "add") {
    return (
      <AddFaqForm
        onBack={() => setActiveFormState("list")}
        onConfirm={handleConfirmForm}
      />
    );
  }

  if (activeFormState === "edit" && editingFaq) {
    return (
      <AddFaqForm
        initialFaq={editingFaq}
        onBack={() => {
          setActiveFormState("list");
          setEditingFaq(null);
        }}
        onConfirm={handleConfirmForm}
      />
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 font-inter">
      {/* Top Header Row */}
      <div className="w-full flex items-center justify-between">
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
            FAQ
          </h2>
        </div>

        {/* Add New FAQ Button */}
        <button
          type="button"
          onClick={() => setActiveFormState("add")}
          className="h-[44px] px-6 bg-[#3E3EDF] hover:bg-[#3232C7] text-white font-medium rounded-[8px] shadow-md transition-colors cursor-pointer"
        >
          Add New FAQ
        </button>
      </div>

      {/* FAQ Cards List */}
      <div className="w-full flex flex-col gap-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="w-full bg-[#FEFEFE] border border-gray-100 rounded-[12px] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden transition-all"
            >
              {/* Question Header */}
              <button
                type="button"
                onClick={() => handleToggle(faq.id)}
                className="w-full p-5 flex items-center justify-between text-left font-medium text-[16px] text-[#1F1D1D] hover:text-[#3E3EDF] transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-[#3E3EDF]" : "text-gray-400"
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Answer & Actions when expanded */}
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-50 flex flex-col gap-4">
                  <p className="text-[14px] text-[#575757] leading-[160%] whitespace-pre-line">
                    {faq.answer}
                  </p>

                  {/* Action Buttons: Delete & Edit */}
                  <div className="w-full flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(faq.id)}
                      className="px-4 py-1.5 border border-[#FF5C5C] text-[#FF5C5C] hover:bg-[#FF5C5C]/10 rounded-[4px] text-[13px] font-medium transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditClick(faq)}
                      className="px-4 py-1.5 border border-[#3E3EDF] text-[#3E3EDF] hover:bg-[#3E3EDF]/10 rounded-[4px] text-[13px] font-medium transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
