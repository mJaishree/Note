'use client'

import React, { useState, useEffect } from 'react'
import FeaturesGrid from '@/components/About/FeaturesGrid'
import StatsSection from '@/components/About/StatsSection'
import TechStack from '@/components/About/TechStack'
import ProjectInfo from '@/components/About/ProjectInfo'

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const FloatingIcon = ({ children, delay = "0s" }: { children: React.ReactNode, delay?: string }) => (
    <div 
      className="absolute animate-float opacity-20"
      style={{ 
        animationDelay: delay,
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`
      }}
    >
      <span className="text-4xl">{children}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4B5A0] via-[#92C5CB] to-[#D4B5A0] relative overflow-hidden">
      {/* Floating Background Icons */}
      <FloatingIcon delay="0s">📝</FloatingIcon>
      <FloatingIcon delay="1s">💡</FloatingIcon>
      <FloatingIcon delay="2s">🚀</FloatingIcon>
      <FloatingIcon delay="3s">⭐</FloatingIcon>
      <FloatingIcon delay="4s">🎨</FloatingIcon>
      <FloatingIcon delay="5s">💻</FloatingIcon>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section with Typewriter Effect */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block p-4 bg-white/20 rounded-full mb-6 animate-bounce-slow">
            <span className="text-6xl animate-pulse">📝</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              TODO App
            </span>
          </h1>
          <div className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-typewriter">
            A modern, intuitive task management application built with cutting-edge web technologies. 
          </div>
        </div>

        {/* Interactive Features Grid */}
        <FeaturesGrid 
          activeFeature={activeFeature} 
          setActiveFeature={setActiveFeature} 
        />

        {/* Animated Stats Section */}
        <StatsSection />

        {/* Animated Tech Stack */}
        <TechStack />

        {/* Interactive Project Info */}
        <ProjectInfo />
      </div>
    </div>
  )
}
