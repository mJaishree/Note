'use client'

import React from 'react'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface DialogModalProps {
  isOpen: boolean
  isEditing: boolean
  title: string
  content: string
  onTitleChange: (title: string) => void
  onContentChange: (content: string) => void
  onSave: () => void
  onClose: () => void
}

// Simple rich text editor component
const SimpleEditor = ({ value, onChange, placeholder }: { value: string, onChange: (val: string) => void, placeholder: string }) => (
  <div className="relative">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-[300px] p-4 border-0 resize-none focus:outline-none bg-transparent text-gray-800 placeholder-gray-500"
      style={{ fontFamily: 'inherit' }}
    />
    <div className="absolute bottom-2 right-2 text-xs text-gray-400">
      {value.length} characters
    </div>
  </div>
)

export default function DialogModal({
  isOpen,
  isEditing,
  title,
  content,
  onTitleChange,
  onContentChange,
  onSave,
  onClose
}: DialogModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#A3D3D8] rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Dialog Header */}
        <div className="bg-[#92C5CB] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-bold text-gray-800">
              {isEditing ? '✏️ Edit Note' : '✨ Create New Note'}
            </span>
            <div className="flex space-x-1">
              <div className="w-2.5 h-2.5 bg-red-400 rounded-full shadow-sm"></div>
              <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-sm"></div>
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-sm"></div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Dialog Content */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📝 Note Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Enter your note title..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📄 Note Content
              </label>
              <div className="border-2 border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm">
                <SimpleEditor
                  value={content}
                  onChange={onContentChange}
                  placeholder="Write your note content here..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="bg-[#92C5CB] px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!title.trim()}
            className="px-6 py-2.5 bg-[#D4B5A0] text-gray-800 rounded-lg font-semibold hover:bg-[#C9A892] active:bg-[#BE9B84] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
          >
            {isEditing ? '💾 Save Changes' : '✨ Create Note'}
          </button>
        </div>
      </div>
    </div>
  )
}
