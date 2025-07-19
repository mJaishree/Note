'use client'

import React from 'react'

export default function StatsSection() {
  const stats = [
    { icon: "🚀", title: "Fast & Reliable", desc: "Built with Next.js for optimal performance and SEO", color: "bg-green-500" },
    { icon: "🎨", title: "Beautiful UI", desc: "Carefully crafted interface with smooth animations", color: "bg-purple-500" },
    { icon: "☁️", title: "Cloud Sync", desc: "Your tasks are safely stored and synced with Firebase", color: "bg-blue-500" }
  ]

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-16 animate-slide-in-left">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-glow">
        What Makes This App Special
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((item, index) => (
          <div key={index} className="text-center group">
            <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 animate-pulse-slow`}>
              <span className="text-2xl text-white">{item.icon}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
