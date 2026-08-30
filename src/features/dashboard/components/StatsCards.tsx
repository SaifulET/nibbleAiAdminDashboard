import React from "react";
import { StatCardData } from "@/types/dashboard.types";

interface StatsCardsProps {
  stats?: StatCardData[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  stats = [
    { id: "1", title: "Total Earnings", value: "$24.88 K" },
    { id: "2", title: "Total Users", value: "6500" },
    { id: "3", title: "Total Brand", value: "740" },
  ],
}) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {stats.map((item) => (
        <div
          key={item.id}
          className="w-full h-[131px] bg-white rounded-[16px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] p-6 flex flex-col justify-center gap-3 transition-transform hover:-translate-y-0.5"
        >
          <span className="font-inter text-[18px] sm:text-[22px] font-normal leading-[27px] text-[#575757]">
            {item.title}
          </span>
          <span className="font-inter text-[28px] sm:text-[32px] font-medium leading-[39px] text-[#3E3EDF]">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};
