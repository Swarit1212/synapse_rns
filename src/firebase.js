// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZQGHX-k9FcgC0WnjwJhxg1qssgX3FEtE",
  authDomain: "mental-health-project-91b76.firebaseapp.com",
  projectId: "mental-health-project-91b76",
  storageBucket: "mental-health-project-91b76.firebasestorage.app",
  messagingSenderId: "560011036099",
  appId: "1:560011036099:web:071b18ab1abe864d36e976",
  measurementId: "G-LFZ3QX4WYY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ hd: "vitstudent.ac.in" });

export { db };
