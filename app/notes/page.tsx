'use client'

import React, { useState, useEffect } from 'react'
import Breadcrumb from '@/components/Notes/Breadcrumb'
import Header from '@/components/Notes/Header'
import NotesGrid from '@/components/Notes/NotesGrid'
import SelectedNotePreview from '@/components/Notes/SelectedNotePreview'
import DialogModal from '@/components/Notes/DialogModal'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load notes from localStorage on component mount
  useEffect(() => {
    if (isClient) {
      const savedNotes = localStorage.getItem('notes')
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }))
        setNotes(parsedNotes)
      }
    }
  }, [isClient])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('notes', JSON.stringify(notes))
    }
  }, [notes, isClient])

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  const createNote = () => {
    if (!title.trim()) return

    const newNote: Note = {
      id: generateId(),
      title: title.trim(),
      content: content,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setNotes(prev => [newNote, ...prev])
    setSelectedNote(newNote)
    closeDialog()
  }

  const updateNote = () => {
    if (!selectedNote || !title.trim()) return

    const updatedNote = {
      ...selectedNote,
      title: title.trim(),
      content: content,
      updatedAt: new Date()
    }

    setNotes(prev => prev.map(note => 
      note.id === selectedNote.id ? updatedNote : note
    ))
    setSelectedNote(updatedNote)
    closeDialog()
  }

  const deleteNote = (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(note => note.id !== noteId))
      if (selectedNote?.id === noteId) {
        setSelectedNote(null)
      }
    }
  }

  const openCreateDialog = () => {
    setIsDialogOpen(true)
    setIsEditing(false)
    setTitle('')
    setContent('')
  }

  const openEditDialog = (note: Note) => {
    setIsDialogOpen(true)
    setIsEditing(true)
    setSelectedNote(note)
    setTitle(note.title)
    setContent(note.content)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setIsEditing(false)
    setTitle('')
    setContent('')
  }

  const handleSave = () => {
    if (isEditing) {
      updateNote()
    } else {
      createNote()
    }
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-800">Loading Notes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh]">
      <Breadcrumb />

      <div className="container mx-auto px-4 py-6">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onCreateNote={openCreateDialog}
        />

        <NotesGrid
          filteredNotes={filteredNotes}
          notes={notes}
          selectedNote={selectedNote}
          onSelectNote={setSelectedNote}
          onEditNote={openEditDialog}
          onDeleteNote={deleteNote}
          onCreateNote={openCreateDialog}
        />

        <SelectedNotePreview
          selectedNote={selectedNote}
          onEditNote={openEditDialog}
          onClosePreview={() => setSelectedNote(null)}
        />
      </div>

      <DialogModal
        isOpen={isDialogOpen}
        isEditing={isEditing}
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSave={handleSave}
        onClose={closeDialog}
      />
    </div>
  )
}
