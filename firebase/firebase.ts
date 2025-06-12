// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz_sfNZJPYeczQgXMZEUijDmLtnZftbOE",
  authDomain: "note-b1965.firebaseapp.com",
  projectId: "note-b1965",
  storageBucket: "note-b1965.firebasestorage.app",
  messagingSenderId: "912013903497",
  appId: "1:912013903497:web:8da3c998d10e968b88a858"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
