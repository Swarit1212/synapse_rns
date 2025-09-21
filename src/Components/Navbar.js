import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button.js";
import { useState } from "react";
import Login from "./Login";
export default function Navbar() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <>
    <div className="Navbar flex justify-between items-center px-6 py-4 bg-[#463A64]">
      {/* Left side - Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src="website_logo.png" alt="Synapse" className="h-8 w-auto" />
        <span className="font-bold text-[#FBD3BF] text-lg">Synapse</span>
      </Link>

      {/* Center - Navigation Links */}
      <nav className="flex gap-4 items-center text-white">
        <Link to="/counsellorList">
          <Button>Counsellors</Button>
        </Link>
        <Link to="/resources">
          <Button>Resources</Button>
        </Link>
        <Link to="/about">
          <Button>About Us</Button>
        </Link>
      </nav>

      {/* Right side - Auth & Profile */}
      <div className="flex gap-3 items-center">
        <button 
            onClick={() => setLoginModalOpen(true)}
            className="inline-block rounded-full px-5 py-2 bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
          >
            Get Started
        </button>
        <Link to="/chatroom">
          <Button>Chat</Button>
        </Link>
        <Link to="/profile">
          <Button>Profile</Button>
        </Link>
      </div>
    </div>
    <Login isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}