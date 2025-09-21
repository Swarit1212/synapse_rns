// src/Services/Auth.js
import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export async function signInWithGoogle(remember) {
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
  const userCred = await signInWithPopup(auth, googleProvider);

  const email = userCred.user?.email || "";
  // restrict to vitstudent.ac.in
  if (!email.endsWith("@vitstudent.ac.in")) {
    await firebaseSignOut(auth);
    throw new Error("Please sign in using your VIT student email (…@vitstudent.ac.in)");
  }

  return userCred;
}

export function logOut() {
  return firebaseSignOut(auth);
}
