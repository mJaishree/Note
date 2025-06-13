'use client'

import React from 'react'

export default function Footer() {
  return (
    <footer className=" py-6 mt-auto">
      <div className="container mx-auto px-4">
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-700">
              Crafted by{' '}
              <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Jaishree M
              </span>
            </p>
            <p className="text-xs text-gray-500 flex items-center justify-center md:justify-end space-x-1">
              <span>Made with</span>
              <span className="text-red-500 text-2xl animate-pulse">♥</span>
              <span>for learning</span>
            </p>
          </div>
        </div>
      
    </footer>
  )
}
