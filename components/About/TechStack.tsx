'use client'

import React from 'react'

export default function TechStack() {
  const techStack = [
    { name: "Next.js 14", color: "bg-black text-white", delay: "0s" },
    { name: "React", color: "bg-blue-500 text-white", delay: "0.1s" },
    { name: "TypeScript", color: "bg-blue-600 text-white", delay: "0.2s" },
    { name: "Firebase", color: "bg-orange-500 text-white", delay: "0.3s" },
    { name: "Tailwind CSS", color: "bg-teal-500 text-white", delay: "0.4s" }
  ]

  return (
    <div className="text-center mb-16 animate-slide-in-right">
      <h2 className="text-3xl font-bold mb-8 animate-gradient bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
        Built With Modern Technologies
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {techStack.map((tech, index) => (
          <span 
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${tech.color} shadow-lg hover:scale-110 transition-all duration-300 animate-fade-in-up cursor-pointer hover:shadow-2xl`}
            style={{ animationDelay: tech.delay }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
            }}
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  )
}
