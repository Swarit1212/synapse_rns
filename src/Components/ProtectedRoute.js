// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, isAuthReady } = useAuth();

  // Wait until auth ready to avoid flash
  if (!isAuthReady) return null;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
