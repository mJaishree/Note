"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/Login/LoginForm";

export default function Home() {
  
  return (
    <div className="min-h-[80vh] flex flex-col">
      <div className="px-4 sm:px-6 lg:px-8 py-2 text-sm text-gray-600 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <span className="hover:underline cursor-pointer transition-colors hover:text-gray-800">
            Homepage
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Login Page</span>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4">
        <LoginForm />
      </div>
    </div>
  );
}
