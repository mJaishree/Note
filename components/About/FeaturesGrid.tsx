'use client'

import React from 'react'

interface Feature {
  icon: string
  title: string
  description: string
  color: string
}

interface FeaturesGridProps {
  activeFeature: number
  setActiveFeature: (index: number) => void
}

export default function FeaturesGrid({ activeFeature, setActiveFeature }: FeaturesGridProps) {
  const features: Feature[] = [
    {
      icon: "✨",
      title: "Create & Edit",
      description: "Seamlessly create and edit your notes with our intuitive interface",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: "🔍",
      title: "Quick Preview",
      description: "Preview your notes instantly without opening the editor",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: "🎉",
      title: "Delightful Experience",
      description: "Enjoy confetti animations and smooth interactions",
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Works perfectly on desktop, tablet, and mobile devices",
      color: "from-orange-400 to-red-400"
    }
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {features.map((feature, index) => (
        <div 
          key={index}
          className={`bg-white/30 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-500 cursor-pointer transform hover:scale-110 hover:rotate-2 ${
            activeFeature === index ? 'ring-4 ring-white/50 scale-105' : ''
          }`}
          style={{ 
            animationDelay: `${index * 0.2}s`,
            background: activeFeature === index ? `linear-gradient(135deg, var(--tw-gradient-stops))` : undefined
          }}
          onMouseEnter={() => setActiveFeature(index)}
        >
          <div className={`text-4xl mb-4 transition-all duration-300 ${activeFeature === index ? 'animate-bounce scale-125' : ''}`}>
            {feature.icon}
          </div>
          <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-700">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}
