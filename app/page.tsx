"use client";

import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login clicked", { email, password });
  };

  const handleRegister = () => {
    console.log("Register clicked");
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Breadcrumb dfgfd fdg */}
      <div className="px-4 sm:px-6 lg:px-8 py-2 text-sm text-gray-600 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <span className="hover:underline cursor-pointer transition-colors hover:text-gray-800">
            Homepage
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Login Page</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Login Card */}
          <div className="bg-[#E8D5C4] rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
            {/* Header */}
            <div className="bg-[#D4B5A0] px-4 sm:px-6 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Login Portal
              </span>
              <div className="flex space-x-1">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full shadow-sm"></div>
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-sm"></div>
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-sm"></div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                  Welcome Back
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Please sign in to your account
                </p>
              </div>

              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800 text-sm placeholder-gray-400 bg-white/80 backdrop-blur-sm"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800 text-sm placeholder-gray-400 bg-white/80 backdrop-blur-sm"
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    onClick={handleLogin}
                    className="flex-1 bg-[#D4B5A0] text-gray-800 py-2.5 px-4 rounded-lg font-semibold hover:bg-[#C8A690] active:bg-[#BCA085] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-sm"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleRegister}
                    className="flex-1 bg-[#A3D3D8] text-gray-800 py-2.5 px-4 rounded-lg font-semibold hover:bg-[#92C5CB] active:bg-[#81B7BD] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-sm"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
