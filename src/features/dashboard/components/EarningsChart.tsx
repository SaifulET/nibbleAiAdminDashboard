"use client";

import React, { useState, useRef, useEffect } from "react";
import { MonthlyEarning } from "@/types/dashboard.types";

interface EarningsChartProps {
  data?: MonthlyEarning[];
}

const yearDataMap: Record<string, MonthlyEarning[]> = {
  "2025": [
    { month: "Jan", amount: 5.2, formattedAmount: "$5.2k" },
    { month: "Feb", amount: 2.8, formattedAmount: "$2.8k" },
    { month: "Mar", amount: 8.24, formattedAmount: "$8.24k" },
    { month: "Apr", amount: 9.1, formattedAmount: "$9.1k" },
    { month: "May", amount: 8.5, formattedAmount: "$8.5k" },
    { month: "Jun", amount: 8.7, formattedAmount: "$8.7k" },
    { month: "Jul", amount: 9.3, formattedAmount: "$9.3k" },
    { month: "Aug", amount: 5.1, formattedAmount: "$5.1k" },
    { month: "Sep", amount: 2.7, formattedAmount: "$2.7k" },
    { month: "Oct", amount: 8.3, formattedAmount: "$8.3k" },
    { month: "Nov", amount: 9.5, formattedAmount: "$9.5k" },
    { month: "Dec", amount: 8.8, formattedAmount: "$8.8k" },
  ],
  "2024": [
    { month: "Jan", amount: 4.1, formattedAmount: "$4.1k" },
    { month: "Feb", amount: 3.5, formattedAmount: "$3.5k" },
    { month: "Mar", amount: 6.8, formattedAmount: "$6.8k" },
    { month: "Apr", amount: 7.2, formattedAmount: "$7.2k" },
    { month: "May", amount: 6.9, formattedAmount: "$6.9k" },
    { month: "Jun", amount: 7.5, formattedAmount: "$7.5k" },
    { month: "Jul", amount: 8.1, formattedAmount: "$8.1k" },
    { month: "Aug", amount: 6.4, formattedAmount: "$6.4k" },
    { month: "Sep", amount: 4.8, formattedAmount: "$4.8k" },
    { month: "Oct", amount: 7.9, formattedAmount: "$7.9k" },
    { month: "Nov", amount: 8.4, formattedAmount: "$8.4k" },
    { month: "Dec", amount: 8.0, formattedAmount: "$8.0k" },
  ],
  "2023": [
    { month: "Jan", amount: 3.2, formattedAmount: "$3.2k" },
    { month: "Feb", amount: 2.1, formattedAmount: "$2.1k" },
    { month: "Mar", amount: 5.4, formattedAmount: "$5.4k" },
    { month: "Apr", amount: 6.0, formattedAmount: "$6.0k" },
    { month: "May", amount: 5.8, formattedAmount: "$5.8k" },
    { month: "Jun", amount: 6.3, formattedAmount: "$6.3k" },
    { month: "Jul", amount: 7.0, formattedAmount: "$7.0k" },
    { month: "Aug", amount: 4.5, formattedAmount: "$4.5k" },
    { month: "Sep", amount: 3.9, formattedAmount: "$3.9k" },
    { month: "Oct", amount: 6.7, formattedAmount: "$6.7k" },
    { month: "Nov", amount: 7.1, formattedAmount: "$7.1k" },
    { month: "Dec", amount: 7.5, formattedAmount: "$7.5k" },
  ],
  "2022": [
    { month: "Jan", amount: 2.5, formattedAmount: "$2.5k" },
    { month: "Feb", amount: 1.9, formattedAmount: "$1.9k" },
    { month: "Mar", amount: 4.0, formattedAmount: "$4.0k" },
    { month: "Apr", amount: 4.8, formattedAmount: "$4.8k" },
    { month: "May", amount: 4.5, formattedAmount: "$4.5k" },
    { month: "Jun", amount: 5.2, formattedAmount: "$5.2k" },
    { month: "Jul", amount: 5.8, formattedAmount: "$5.8k" },
    { month: "Aug", amount: 3.8, formattedAmount: "$3.8k" },
    { month: "Sep", amount: 3.1, formattedAmount: "$3.1k" },
    { month: "Oct", amount: 5.5, formattedAmount: "$5.5k" },
    { month: "Nov", amount: 6.0, formattedAmount: "$6.0k" },
    { month: "Dec", amount: 6.4, formattedAmount: "$6.4k" },
  ],
};

export const EarningsChart: React.FC<EarningsChartProps> = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredMonth, setHoveredMonth] = useState<string | null>("Mar");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableYears = ["2025", "2024", "2023", "2022"];
  const currentChartData = data || yearDataMap[selectedYear] || yearDataMap["2025"];

  const yLabels = ["$10k", "$8k", "$6k", "$4k", "$2k", "$0k"];
  const maxAmount = 10;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-auto min-h-[300px] bg-[#FEFEFE] rounded-[8px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] p-4 sm:p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="font-inter text-[18px] sm:text-[20px] font-medium leading-[24px] text-[#1F1D1D]">
          Earnings
        </h2>

        {/* Interactive Year Select Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 font-inter text-[16px] sm:text-[18px] font-medium text-[#1F1D1D] hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
            aria-label="Select year"
            aria-expanded={isDropdownOpen}
          >
            <span>{selectedYear}</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1F1D1D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 font-inter text-[16px]">
              {availableYears.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => {
                    setSelectedYear(year);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-[#3E3EDF]/10 transition-colors cursor-pointer ${
                    selectedYear === year
                      ? "text-[#3E3EDF] font-semibold bg-[#3E3EDF]/5"
                      : "text-[#575757]"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Plot Area */}
      <div className="w-full overflow-x-auto pb-2">
        <div className="min-w-[500px] sm:min-w-full flex items-end gap-3 h-[200px] relative pt-6">
          {/* Y Axis Labels */}
          <div className="h-full flex flex-col justify-between pr-2 text-right font-inter text-[12px] sm:text-[14px] font-medium text-[#575757] shrink-0 pb-6">
            {yLabels.map((lbl) => (
              <span key={lbl}>{lbl}</span>
            ))}
          </div>

          {/* Chart Content Area with Grid & Bars */}
          <div className="flex-1 h-full flex flex-col justify-between relative">
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              {yLabels.map((_, i) => (
                <div
                  key={i}
                  className="w-full border-t border-[#575757]/20 h-0"
                />
              ))}
            </div>

            {/* Bars Container */}
            <div className="w-full h-[155px] flex items-end justify-between px-2 relative z-10">
              {currentChartData.map((item) => {
                const heightPercent = Math.min(
                  100,
                  (item.amount / maxAmount) * 100
                );
                const isHighlighted = hoveredMonth === item.month;

                return (
                  <div
                    key={item.month}
                    onMouseEnter={() => setHoveredMonth(item.month)}
                    className="flex flex-col items-center group relative h-full justify-end cursor-pointer"
                  >
                    {/* Tooltip Badge */}
                    {isHighlighted && (
                      <div className="absolute -top-7 bg-white text-[#575757] font-inter text-[12px] px-2 py-0.5 rounded shadow-[0px_0px_18px_rgba(0,0,0,0.1)] whitespace-nowrap z-20">
                        {item.formattedAmount}
                      </div>
                    )}

                    {/* Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-4 sm:w-6 bg-[#3E3EDF] rounded-t-[2.5px] transition-all duration-300 group-hover:bg-[#3232C7]"
                    />
                  </div>
                );
              })}
            </div>

            {/* X Axis Month Labels */}
            <div className="w-full flex items-center justify-between px-2 pt-2 border-t border-[#575757] text-center font-inter text-[12px] sm:text-[14px] text-[#575757]">
              {currentChartData.map((item) => (
                <span key={item.month} className="w-4 sm:w-6 text-center">
                  {item.month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
