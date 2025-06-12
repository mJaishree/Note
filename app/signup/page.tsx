"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/Signup/SignupForm";

export default function Signup() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 py-2 text-sm text-gray-600 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <span 
            className="hover:underline cursor-pointer transition-colors hover:text-gray-800"
            onClick={() => router.push("/")}
          >
            Homepage
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Signup Page</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4">
        <SignupForm />
      </div>
    </div>
  );
}
