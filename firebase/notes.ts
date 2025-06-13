import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp 
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

// Create a new note
export const createNote = async (userId: string, title: string, content: string) => {
  try {
    const noteData = {
      title: title.trim(),
      content: content,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      userId: userId
    };

    const docRef = await addDoc(collection(db, "notes"), noteData);
    
    return {
      success: true,
      noteId: docRef.id,
      message: "Note created successfully!"
    };
  } catch (error: any) {
    console.error("Error creating note:", error);
    return {
      success: false,
      error: error,
      message: "Failed to create note"
    };
  }
};

// Get all notes for a user
export const getUserNotes = async (userId: string) => {
  try {
    const q = query(
      collection(db, "notes"),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const notes: Note[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      notes.push({
        id: doc.id,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        userId: data.userId
      });
    });

    return {
      success: true,
      notes: notes,
      message: "Notes fetched successfully!"
    };
  } catch (error: any) {
    console.error("Error fetching notes:", error);
    return {
      success: false,
      error: error,
      notes: [],
      message: "Failed to fetch notes"
    };
  }
};

// Update a note
export const updateNote = async (noteId: string, title: string, content: string) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    
    await updateDoc(noteRef, {
      title: title.trim(),
      content: content,
      updatedAt: Timestamp.now()
    });

    return {
      success: true,
      message: "Note updated successfully!"
    };
  } catch (error: any) {
    console.error("Error updating note:", error);
    return {
      success: false,
      error: error,
      message: "Failed to update note"
    };
  }
};

// Delete a note
export const deleteNote = async (noteId: string) => {
  try {
    await deleteDoc(doc(db, "notes", noteId));

    return {
      success: true,
      message: "Note deleted successfully!"
    };
  } catch (error: any) {
    console.error("Error deleting note:", error);
    return {
      success: false,
      error: error,
      message: "Failed to delete note"
    };
  }
};


export const subscribeToUserNotes = (userId: string, callback: (notes: Note[]) => void) => {
  const q = query(
    collection(db, "notes"),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (querySnapshot) => {
    const notes: Note[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      notes.push({
        id: doc.id,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        userId: data.userId
      });
    });
    callback(notes);
  });
};
