'use client'

import React from 'react'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId: string
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
  loading?: boolean
  error?: string
}

// Simple rich text editor component
const SimpleEditor = ({ 
  value, 
  onChange, 
  placeholder, 
  disabled = false 
}: { 
  value: string, 
  onChange: (val: string) => void, 
  placeholder: string,
  disabled?: boolean 
}) => (
  <div className="relative">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full h-[300px] p-4 border-0 resize-none focus:outline-none bg-transparent text-gray-800 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
  onClose,
  loading = false,
  error = ""
}: DialogModalProps) {
  if (!isOpen) return null

  const handleSave = () => {
    if (!title.trim()) return
    onSave()
  }

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
            disabled={loading}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Dialog Content */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

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
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800 placeholder-gray-500 bg-white/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="bg-[#92C5CB] px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2.5 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || loading}
            className="px-6 py-2.5 bg-[#D4B5A0] text-gray-800 rounded-lg font-semibold hover:bg-[#C9A892] active:bg-[#BE9B84] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditing ? 'Saving...' : 'Creating...'}
              </span>
            ) : (
              <>
                {isEditing ? '💾 Save Changes' : '✨ Create Note'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
