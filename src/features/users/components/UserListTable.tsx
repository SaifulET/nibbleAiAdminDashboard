"use client";

import React from "react";
import { UserDetail } from "@/types/users.types";
import { UserFilterBar } from "./UserFilterBar";
import { PaginationBar } from "@/features/earnings/components/PaginationBar";

interface UserListTableProps {
  users?: UserDetail[];
  onViewUser?: (user: UserDetail) => void;
}

export const UserListTable: React.FC<UserListTableProps> = ({
  users = [
    {
      id: "1",
      sl: "1",
      userName: "Tamim",
      email: "fzaaaaa@gmail.com",
      phoneNumber: "(+33)6 55 53 38 10",
      joiningDate: "16 Apr 2024",
      address: "South Dakota 83475",
    },
    {
      id: "2",
      sl: "1",
      userName: "Tamim",
      email: "dric@gmail.com",
      phoneNumber: "(+33)7 00 55 55 11",
      joiningDate: "16 Apr 2024",
      address: "South Dakota 83475",
    },
    {
      id: "3",
      sl: "1",
      userName: "Tamim",
      email: "ziar@gmail.com",
      phoneNumber: "(+33)6 55 52 17 33",
      joiningDate: "16 Apr 2024",
      address: "South Dakota 83475",
    },
    {
      id: "4",
      sl: "1",
      userName: "Tamim",
      email: "xeno@yandex.ru",
      phoneNumber: "(+33)7 35 5 46 14",
      joiningDate: "16 Apr 2024",
      address: "South Dakota 83475",
    },
    {
      id: "5",
      sl: "1",
      userName: "Tamim",
      email: "zitka@mail.ru",
      phoneNumber: "(+33)7 35 55 21 02",
      joiningDate: "16 Apr 2024",
      address: "South Dakota 83475",
    },
    {
      id: "6",
      sl: "1",
      userName: "Tamim",
      email: "bertou@yandex.ru",
      phoneNumber: "(+33)7 35 55 45 43",
      joiningDate: "16 Apr 2024",
      address: "South Dakota 83475",
    },
    {
      id: "7",
      sl: "1",
      userName: "Tamim",
      email: "rrian@yandex.ru",
      phoneNumber: "(+33)7 75 55 65 33",
      joiningDate: "16 Apr 2024",
      address: "South Dakota 83475",
    },
    {
      id: "8",
      sl: "1",
      userName: "Tamim",
      email: "hamli@gmail.com",
      phoneNumber: "(+33)7 00 55 56 79",
      joiningDate: "16 Apr 2024",
      address: "South Dakota 83475",
    },
    {
      id: "9",
      sl: "1",
      userName: "Tamim",
      email: "xterris@gmail.com",
      phoneNumber: "(+33)7 55 55 33 70",
      joiningDate: "16 Apr 2024",
      address: "South Dakota 83475",
    },
  ],
  onViewUser,
}) => {
  return (
    <div className="w-full bg-[#FEFEFE] rounded-[8px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] p-4 sm:p-6 flex flex-col gap-6 overflow-hidden">
      {/* Top Header: Title + Pill Filter Bar */}
      <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h2 className="font-inter text-[20px] font-medium leading-[24px] text-[#1F1D1D]">
          User List
        </h2>

        <UserFilterBar />
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#3E3EDF] text-[#FEFEFE] font-inter text-[16px] font-medium leading-[150%] h-[50px]">
              <th className="px-6 py-3 rounded-l-[4px]">#Sl</th>
              <th className="px-6 py-3">User Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Number</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right rounded-r-[4px]">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="font-inter text-[14px] text-[#575757]">
            {users.map((usr) => (
              <tr
                key={usr.id}
                className="h-[52px] border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-3">{usr.sl}</td>
                <td className="px-6 py-3">{usr.userName}</td>
                <td className="px-6 py-3">{usr.email}</td>
                <td className="px-6 py-3">{usr.phoneNumber}</td>
                <td className="px-6 py-3">{usr.joiningDate}</td>
                <td className="px-6 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onViewUser && onViewUser(usr)}
                    className="inline-flex items-center justify-center w-8 h-8 text-[#3E3EDF] hover:bg-[#3E3EDF]/10 rounded-full transition-colors cursor-pointer"
                    aria-label={`View details for ${usr.userName}`}
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

      {/* Pagination Bar */}
      <PaginationBar />
    </div>
  );
};
