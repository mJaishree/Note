'use client'

import React from 'react'
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

interface NotesGridProps {
  filteredNotes: Note[]
  notes: Note[]
  selectedNote: Note | null
  onSelectNote: (note: Note) => void
  onEditNote: (note: Note) => void
  onDeleteNote: (noteId: string) => void
  onCreateNote: () => void
  loading?: boolean
  error?: string
}

export default function NotesGrid({
  filteredNotes,
  notes,
  selectedNote,
  onSelectNote,
  onEditNote,
  onDeleteNote,
  onCreateNote,
  loading = false,
  error = ""
}: NotesGridProps) {
  
  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-[#A3D3D8] rounded-xl shadow-lg animate-pulse">
            <div className="bg-[#92C5CB] px-4 py-3 rounded-t-xl">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                <div className="h-3 bg-gray-300 rounded w-4/6"></div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="col-span-full">
        <div className="bg-red-100 border border-red-400 rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Notes
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredNotes.length === 0 ? (
        <div className="col-span-full">
          <div className="bg-[#A3D3D8] rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {notes.length === 0 ? 'No tasks yet!' : 'No matching tasks'}
            </h3>
            <p className="text-gray-600 mb-4">
              {notes.length === 0 ? 'Create your first task to get started' : 'Try adjusting your search terms'}
            </p>
            {notes.length === 0 && (
              <button
                onClick={onCreateNote}
                className="px-6 py-2.5 bg-[#D4B5A0] text-gray-800 rounded-lg font-semibold hover:bg-[#C9A892] transition-all duration-200"
              >
                Create First Task
              </button>
            )}
          </div>
        </div>
      ) : (
        filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`bg-[#A3D3D8] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
              selectedNote?.id === note.id ? 'ring-2 ring-blue-400 shadow-xl' : ''
            }`}
            onClick={() => onSelectNote(note)}
          >
            {/* Note Header */}
            <div className="bg-[#92C5CB] px-4 py-3 flex items-center justify-between rounded-t-xl">
              <h3 className="font-semibold text-gray-800 truncate flex-1 text-sm">
                {note.title}
              </h3>
              <div className="flex gap-1 ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEditNote(note)
                  }}
                  className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white/50 rounded transition-all duration-200"
                  title="Edit"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm('Are you sure you want to delete this note?')) {
                      onDeleteNote(note.id)
                    }
                  }}
                  className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-white/50 rounded transition-all duration-200"
                  title="Delete"
                >
                 <MdDelete />
                </button>
              </div>
            </div>

            {/* Note Content */}
            <div className="p-4">
              <div className="text-sm text-gray-700 line-clamp-4 mb-3 min-h-[4rem]">
                {note.content.substring(0, 120)}{note.content.length > 120 ? '...' : ''}
              </div>
              <div className="text-xs text-gray-500 flex items-center justify-between">
                <span>📅 {note.updatedAt.toLocaleDateString()}</span>
                <span>🕒 {note.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
