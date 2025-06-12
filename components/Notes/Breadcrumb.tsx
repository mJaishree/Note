'use client'

import React from 'react'

export default function Breadcrumb() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-3 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto">
        <span className="hover:underline cursor-pointer transition-colors hover:text-gray-800 text-sm text-gray-600">
          Homepage
        </span>
        <span className="mx-2 text-gray-600">/</span>
        <span className="text-gray-800 font-medium text-sm">My Notes</span>
      </div>
    </div>
  )
}
