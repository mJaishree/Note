import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

export default function Loader({ 
  size = 'md', 
  color = 'text-gray-600',
  text = 'Loading...' 
}: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="w-full h-full border-2 border-gray-300 border-t-blue-500 rounded-full"></div>
      </div>
      {text && (
        <span className={`text-sm ${color}`}>
          {text}
        </span>
      )}
    </div>
  );
}
