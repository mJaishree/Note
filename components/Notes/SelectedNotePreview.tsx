'use client'

import React from 'react'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface SelectedNotePreviewProps {
  selectedNote: Note | null
  onEditNote: (note: Note) => void
  onClosePreview: () => void
}

export default function SelectedNotePreview({
  selectedNote,
  onEditNote,
  onClosePreview
}: SelectedNotePreviewProps) {
  if (!selectedNote) return null

  return (
    <div className="mt-6 bg-[#A3D3D8] rounded-xl shadow-xl overflow-hidden">
      <div className="bg-[#92C5CB] px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{selectedNote.title}</h2>
          <p className="text-sm text-gray-600">
            Created: {selectedNote.createdAt.toLocaleDateString()} • 
            Updated: {selectedNote.updatedAt.toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEditNote(selectedNote)}
            className="px-4 py-2 bg-[#D4B5A0] text-gray-800 rounded-lg font-semibold hover:bg-[#C9A892] transition-all duration-200"
          >
            Edit
          </button>
          <button
            onClick={onClosePreview}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="prose max-w-none text-gray-700 bg-white/50 rounded-lg p-4 whitespace-pre-wrap">
          {selectedNote.content}
        </div>
      </div>
    </div>
  )
}
