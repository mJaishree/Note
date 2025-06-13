'use client'

import React from 'react'

export default function ProjectInfo() {
  const skills = ["Full-Stack Development", "Modern UI/UX", "Cloud Integration"]

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 text-center animate-fade-in-up hover:bg-white/40 transition-all duration-500 group">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:scale-105 transition-transform">
        Project Overview
      </h2>
      <p className="text-gray-700 mb-6 max-w-3xl mx-auto group-hover:text-gray-800 transition-colors">
        This Notes application demonstrates modern web development practices including 
        component-based architecture, state management, real-time database integration, 
        and responsive design principles. The app features user authentication, 
        CRUD operations, and an engaging user experience with animations and transitions.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="bg-white/40 rounded-lg px-4 py-2 hover:bg-white/60 transition-all duration-300 hover:scale-105 cursor-pointer animate-bounce-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <span className="text-sm font-semibold text-gray-800">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
