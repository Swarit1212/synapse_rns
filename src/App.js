// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import CounsellorList from "./Components/CounsellorList";
import ResourcesPage from "./Components/ResourcesPage";
import CounsellorDetail from "./Components/CounsellorDetail";
import ChatRoom from "./Components/ChatRoom";
import ReviewForm from "./Components/ReviewForm";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Components/Profile";

export default function App() {
  return (
    <AuthProvider>
      {/* background wrapper */}
      <div className="min-h-screen relative bg-custom-bg bg-cover bg-center">
        {/* soft overlay to dim background for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-synapse-50/40 to-synapse-deep/10 pointer-events-none" />
        <div className="relative z-10">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/counsellorList" element={<CounsellorList />} />
              <Route path="/counsellorDetail/:id" element={<CounsellorDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/chatroom"
                element={
                  <ProtectedRoute>
                    <ChatRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/counsellorDetail/:id/review"
                element={
                  <ProtectedRoute>
                    <ReviewForm />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </AuthProvider>
  );
}
