import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, User } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Signup function
export const signUpUser = async (email: string, password: string, username: string) => {
  try {
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    
    await updateProfile(user, {
      displayName: username
    });
    
    return {
      success: true,
      user: user,
      message: "Account created successfully!"
    };
  } catch (error: any) {
    return {
      success: false,
      error: error,
      message: getAuthErrorMessage(error.code)
    };
  }
};

// Sign in function
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    return {
      success: true,
      user: user,
      message: "Logged in successfully!"
    };
  } catch (error: any) {
    return {
      success: false,
      error: error,
      message: getAuthErrorMessage(error.code)
    };
  }
};

// Sign out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return {
      success: true,
      message: "Logged out successfully!"
    };
  } catch (error: any) {
    return {
      success: false,
      error: error,
      message: "Failed to log out"
    };
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};


const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return "This email is already registered";
    case 'auth/weak-password':
      return "Password is too weak";
    case 'auth/invalid-email':
      return "Invalid email address";
    case 'auth/user-not-found':
      return "No account found with this email";
    case 'auth/wrong-password':
      return "Incorrect password";
    case 'auth/invalid-credential':
      return "Invalid email or password";
    case 'auth/too-many-requests':
      return "Too many failed attempts. Please try again later";
    default:
      return "An error occurred. Please try again";
  }
};
