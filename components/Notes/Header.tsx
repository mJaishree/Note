'use client'

import React from 'react'

interface HeaderProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  onCreateNote: () => void
}

export default function Header({ searchTerm, setSearchTerm, onCreateNote }: HeaderProps) {
  return (
    <div className="bg-[#A3D3D8] rounded-xl shadow-xl mb-6 overflow-hidden">
      <div className="bg-[#92C5CB] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-bold text-gray-800">📝 Notes Manager</span>
          <div className="flex space-x-1">
            <div className="w-2.5 h-2.5 bg-red-400 rounded-full shadow-sm"></div>
            <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-sm"></div>
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="🔍 Search your notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
          />
          <button
            onClick={onCreateNote}
            className="px-6 py-2.5 bg-[#D4B5A0] text-gray-800 rounded-lg font-semibold hover:bg-[#C9A892] active:bg-[#BE9B84] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
          >
            ✨ New Note
          </button>
        </div>
      </div>
    </div>
  )
}
