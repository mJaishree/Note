"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInUser } from "@/firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    setSuccess("");
    
    // Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const result = await signInUser(email, password);
      
      if (result.success) {
        console.log("User logged in successfully:", result.user?.uid);
        setSuccess(`${result.message} Redirecting...`);
        
        // Clear form
        setEmail("");
        setPassword("");
        
        // Navigate to dashboard or home page after successful login
        setTimeout(() => {
          router.push("/notes"); // You can change this to wherever you want to redirect
        }, 2000);
      } else {
        setError(result.message);
        console.error("Login error:", result.error);
      }
      
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
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

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

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
                disabled={loading}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800 text-sm placeholder-gray-400 bg-white/80 backdrop-blur-sm disabled:opacity-50"
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
                disabled={loading}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800 text-sm placeholder-gray-400 bg-white/80 backdrop-blur-sm disabled:opacity-50"
              />
            </div>

            {/* Login Button */}
            <div className="pt-4">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-[#D4B5A0] text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-[#C8A690] active:bg-[#BCA085] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>

            {/* Signup Link */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-600">
                Don't have an account?{" "}
                <span 
                  onClick={() => router.push("/signup")}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer font-semibold hover:underline"
                >
                  Create Account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
