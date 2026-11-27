import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';

export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email.trim(), password);
}

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

export function signOutUser() {
  return signOut(auth);
}

export function authErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Enter a valid email';
    case 'auth/missing-password':
      return 'Enter your password';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters';
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Wrong email or password';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later';
    default:
      return 'Something went wrong. Try again';
  }
}
