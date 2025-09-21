// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logOut } from "../Services/Auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { XMarkIcon } from '@heroicons/react/24/solid'; // For the close button

const logoPath = "/website_logo.png";

// The component now accepts props to control its state
export default function Login({ isOpen, onClose }) {
    const [rememberMe, setRememberMe] = useState(false);
    const [status, setStatus] = useState("typing");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Your logic functions remain mostly the same
    async function handleGoogleSignIn() {
        setError(null);
        setStatus("submitting");
        try {
            const userCred = await signInWithGoogle(rememberMe);
            const userRef = doc(db, "users", userCred.user.uid);
            await setDoc(userRef, {
                fullname: userCred.user.displayName || "",
                email: userCred.user.email,
                createdAt: new Date(),
            }, { merge: true });

            setStatus("submitted");
            // Instead of navigating, we close the modal on success
            setTimeout(onClose, 1000); 
        } catch (err) {
            setError(err);
            setStatus("typing");
        }
    }

    async function handleSignOut() {
        // ... (handleSignOut logic is unchanged) ...
    }

    // If the modal is not supposed to be open, render nothing
    if (!isOpen) {
        return null;
    }

    return (
        // Full screen overlay
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
            onClick={onClose} // Close modal when clicking the overlay
        >
            {/* Themed modal panel. stopPropagation prevents closing when clicking inside the panel */}
            <div 
                className="relative w-full max-w-md bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                    <XMarkIcon className="w-6 h-6" />
                </button>

                <div className="text-center mb-8">
                    <img src={logoPath} alt="Synapse Logo" className="h-12 mx-auto mb-2" />
                    <h2 className="text-2xl font-bold text-slate-100">Sign in to Synapse</h2>
                    <p className="text-slate-400 mt-1">Use your VIT Google Account</p>
                </div>

                {/* Status Messages */}
                {status === "submitted" && (
                    <p className="text-center text-green-400 font-medium p-3 bg-green-900/50 rounded-md mb-4">
                        Success! Closing...
                    </p>
                )}
                {error && (
                    <p className="text-center text-red-400 font-medium p-3 bg-red-900/50 rounded-md mb-4">
                        {error.message}
                    </p>
                )}

                {/* Google Sign-In Button */}
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={status === "submitting"}
                        className="w-full flex items-center justify-center gap-3 bg-white text-slate-800 font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 hover:bg-slate-200 hover:shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        <i className="fa-brands fa-google text-lg"></i>
                        <span>{status === "submitting" ? "Signing in..." : "Continue with Google"}</span>
                    </button>
                </div>
                
                {/* Remember Me & Sign Out (your original structure) */}
                <div className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-300">
                    <input id="rememberMe" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-500" />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>
            </div>
        </div>
    );
}