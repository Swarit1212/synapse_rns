import React from "react";
import { Link } from "react-router-dom";

// Make sure your logo is in the `public` folder and named `synapse-logo.png`
const logoPath = "/website_logo.png";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 md:px-12 bg-white/70 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <Link to="/" className="flex items-center gap-2">
        <img src={logoPath} alt="Synapse Logo" className="h-8 md:h-10" />
        <span className="text-2xl font-bold text-gray-800 hidden md:block">Synapse</span>
      </Link>
      <nav>
        <ul className="flex items-center gap-4 text-gray-700 font-medium md:gap-6">
          <li><Link to="/counselorList" className="hover:text-synapse-deep transition-colors">Counselors</Link></li>
          <li><Link to="/resources" className="hover:text-synapse-deep transition-colors">Resources</Link></li>
          <li><Link to="/chat" className="hover:text-synapse-deep transition-colors">Chat</Link></li>
          <li><Link to="/about" className="hover:text-synapse-deep transition-colors">About Us</Link></li>
          <li className="hidden md:block">
            <Link to="/login" className="inline-block rounded-full px-5 py-2 bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition-colors">
              Get Started
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;