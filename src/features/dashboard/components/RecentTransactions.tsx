"use client";

import React from "react";
import { Transaction } from "@/types/dashboard.types";

interface RecentTransactionsProps {
  transactions?: Transaction[];
  onViewTransaction?: (id: string) => void;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions = [
    {
      id: "1",
      transactionId: "12345678",
      userName: "Tamim",
      brandName: "John Doe",
      amount: "$250",
      date: "16 Apr 2024",
    },
    {
      id: "2",
      transactionId: "12345678",
      userName: "Tamim",
      brandName: "John Doe",
      amount: "$250",
      date: "16 Apr 2024",
    },
    {
      id: "3",
      transactionId: "12345678",
      userName: "Tamim",
      brandName: "John Doe",
      amount: "$250",
      date: "16 Apr 2024",
    },
    {
      id: "4",
      transactionId: "12345678",
      userName: "Tamim",
      brandName: "John Doe",
      amount: "$250",
      date: "16 Apr 2024",
    },
    {
      id: "5",
      transactionId: "12345678",
      userName: "Tamim",
      brandName: "John Doe",
      amount: "$250",
      date: "16 Apr 2024",
    },
  ],
  onViewTransaction,
}) => {
  return (
    <div className="w-full bg-[#FEFEFE] rounded-[8px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] p-5 flex flex-col gap-4 overflow-hidden">
      {/* Title */}
      <h2 className="font-inter text-[20px] font-medium leading-[24px] text-[#1F1D1D] px-1">
        Recent Transactions
      </h2>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#3E3EDF] text-[#FEFEFE] font-inter text-[16px] font-medium leading-[150%] h-[50px]">
              <th className="px-6 py-3 rounded-l-[4px]">#Tr.ID</th>
              <th className="px-6 py-3">User Name</th>
              <th className="px-6 py-3">Brand Name</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right rounded-r-[4px]">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="font-inter text-[14px] text-[#575757]">
            {transactions.map((tr) => (
              <tr
                key={tr.id}
                className="h-[52px] border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-3">{tr.transactionId}</td>
                <td className="px-6 py-3">{tr.userName}</td>
                <td className="px-6 py-3">{tr.brandName}</td>
                <td className="px-6 py-3">{tr.amount}</td>
                <td className="px-6 py-3">{tr.date}</td>
                <td className="px-6 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onViewTransaction && onViewTransaction(tr.id)}
                    className="inline-flex items-center justify-center w-8 h-8 text-[#3E3EDF] hover:bg-[#3E3EDF]/10 rounded-full transition-colors cursor-pointer"
                    aria-label={`View transaction ${tr.transactionId}`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3E3EDF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
