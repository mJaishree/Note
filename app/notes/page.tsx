"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import {
  createNote,
  getUserNotes,
  updateNote,
  deleteNote,
  subscribeToUserNotes,
  Note,
} from "@/firebase/notes";
import Breadcrumb from "@/components/Notes/Breadcrumb";
import Header from "@/components/Notes/Header";
import NotesGrid from "@/components/Notes/NotesGrid";
import SelectedNotePreview from "@/components/Notes/SelectedNotePreview";
import DialogModal from "@/components/Notes/DialogModal";

export default function Notes() {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Notes state
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesError, setNotesError] = useState("");

  // Use ref to access current selectedNote without causing re-renders
  const selectedNoteRef = useRef<Note | null>(null);
  
  // Update ref whenever selectedNote changes
  useEffect(() => {
    selectedNoteRef.current = selectedNote;
  }, [selectedNote]);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dialogLoading, setDialogLoading] = useState(false);
  const [dialogError, setDialogError] = useState("");

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User authenticated:", currentUser.uid);
      } else {
        console.log("User not authenticated, redirecting to login");
        router.push("/");
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    console.log("Setting up real-time notes listener for user:", user.uid);
    setNotesLoading(true);
    setNotesError("");

    const unsubscribe = subscribeToUserNotes(user.uid, (userNotes) => {
      console.log("Received notes update:", userNotes.length, "notes");
      setNotes(userNotes);
      setNotesLoading(false);

      // Use ref to access current selectedNote without causing dependency issues
      const currentSelectedNote = selectedNoteRef.current;
      if (currentSelectedNote) {
        const updatedSelectedNote = userNotes.find(
          (note) => note.id === currentSelectedNote.id
        );
        if (updatedSelectedNote) {
          setSelectedNote(updatedSelectedNote);
        } else {
          // Note was deleted
          setSelectedNote(null);
        }
      }
    });

    return () => {
      console.log("Cleaning up notes listener");
      unsubscribe();
    };
  }, [user]); // Removed selectedNote from dependencies

  // Create new note
  const handleCreateNote = async () => {
    if (!user || !title.trim()) return;

    setDialogLoading(true);
    setDialogError("");

    try {
      const result = await createNote(user.uid, title, content);

      if (result.success) {
        console.log("Note created successfully:", result.noteId);
        closeDialog();
      } else {
        setDialogError(result.message);
        console.error("Failed to create note:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error creating note:", error);
      setDialogError("An unexpected error occurred");
    } finally {
      setDialogLoading(false);
    }
  };

  // Update existing note
  const handleUpdateNote = async () => {
    if (!selectedNote || !title.trim()) return;

    setDialogLoading(true);
    setDialogError("");

    try {
      const result = await updateNote(selectedNote.id, title, content);

      if (result.success) {
        console.log("Note updated successfully:", selectedNote.id);
        closeDialog();
      } else {
        setDialogError(result.message);
        console.error("Failed to update note:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error updating note:", error);
      setDialogError("An unexpected error occurred");
    } finally {
      setDialogLoading(false);
    }
  };

  // Delete note
  const handleDeleteNote = async (noteId: string) => {
    if (!user) return;

    try {
      const result = await deleteNote(noteId);

      if (result.success) {
        console.log("Note deleted successfully:", noteId);
      } else {
        console.error("Failed to delete note:", result.error);
        setNotesError(result.message);
      }
    } catch (error) {
      console.error("Unexpected error deleting note:", error);
      setNotesError("Failed to delete note");
    }
  };

  // Dialog functions
  const openCreateDialog = () => {
    setIsDialogOpen(true);
    setIsEditing(false);
    setTitle("");
    setContent("");
    setDialogError("");
  };

  const openEditDialog = (note: Note) => {
    setIsDialogOpen(true);
    setIsEditing(true);
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setDialogError("");
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    setTitle("");
    setContent("");
    setDialogError("");
    setDialogLoading(false);
  };

  const handleSave = () => {
    if (isEditing) {
      handleUpdateNote();
    } else {
      handleCreateNote();
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-800">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-800">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh]">
      <Breadcrumb />

      <div className="container mx-auto px-4 py-6">
        {/* Welcome message */}
        <div className="mb-4 p-4 bg-[#E8D5C4] rounded-lg">
          <h1 className="text-lg font-semibold text-gray-800">
            Welcome back, {user.displayName || user.email}! 👋
          </h1>
          <p className="text-sm text-gray-600">
            You have {notes.length} task{notes.length !== 1 ? "s" : ""} in your
            collection
          </p>
        </div>

        {notesError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {notesError}
            <button
              onClick={() => setNotesError("")}
              className="ml-2 text-red-800 hover:text-red-900 font-semibold"
            >
              ✕
            </button>
          </div>
        )}

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
          onDeleteNote={handleDeleteNote}
          onCreateNote={openCreateDialog}
          loading={notesLoading}
          error={notesError}
        />

        <SelectedNotePreview
          selectedNote={selectedNote}
          onEditNote={openEditDialog}
          onClosePreview={() => setSelectedNote(null)}
          loading={false}
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
        loading={dialogLoading}
        error={dialogError}
      />
    </div>
  );
}