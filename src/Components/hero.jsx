import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const quotes = [
  "Your feelings are valid.",
  "It’s okay to ask for help.",
  "One step at a time.",
  "This too shall pass."
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-14 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: headline with rotating quotes */}
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-synapse-deep leading-tight">
            You're Not Alone
          </h1>
          <p className="max-w-xl text-lg text-gray-600 transition-all duration-700 ease-in-out">
            {quotes[index]}
          </p>
          <p className="max-w-xl text-gray-600 mt-2">
            Your journey to well-being begins here. Let's connect — find support,
            tools, and a community that understands.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Link
              to="/resources"
              className="inline-block rounded-full px-8 py-4 bg-amber-300/90 text-synapse-deep font-semibold text-lg shadow-lg hover:bg-amber-300 transition-colors"
            >
              Find Support
            </Link>
          </div>
        </div>

        {/* Right: Glowing circle + connectors */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-96 h-96 md:w-[420px] md:h-[420px] flex items-center justify-center">
            {/* SVG for connector lines */}
            <svg className="absolute w-full h-full inset-0 z-0" viewBox="0 0 420 420">
              <path
                d="
                  M 210 210 C 250 160, 300 120, 330 80
                  M 210 210 C 170 160, 120 120, 90 80
                  M 210 210 C 170 260, 120 300, 90 340
                  M 210 210 C 250 260, 300 300, 330 340
                "
                stroke="#fff"
                strokeWidth="1"
                fill="transparent"
                strokeOpacity="0.5"
              />
            </svg>

            {/* Outer soft glow ring */}
            <div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(246,182,118,0.25), rgba(107,75,122,0.06))",
              }}
            />

            {/* Central circle */}
            <div
              className="relative z-10 w-48 h-48 rounded-full flex items-center justify-center text-white font-semibold text-lg"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #ffd9c7, #eaa77f)",
                boxShadow: "0 10px 30px rgba(107,75,122,0.25)",
              }}
            >
              <span className="text-synapse-deep font-bold">Synapse</span>
            </div>
            
            {/* Connectors with text and icons */}
            <Link to="/community" className="absolute top-10 right-4 transform translate-x-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-800 hover:text-synapse-deep transition-colors z-20">
              <span className="text-sm font-medium whitespace-nowrap hidden md:block">Community</span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                {/* <img src="/path-to-your-community-icon.png" alt="Community" className="w-4 h-4" /> */}
              </div>
            </Link>

            <Link to="/counselorList" className="absolute top-10 left-4 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-800 hover:text-synapse-deep transition-colors z-20">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                {/* <img src="/path-to-your-counselor-icon.png" alt="Counselors" className="w-4 h-4" /> */}
              </div>
              <span className="text-sm font-medium whitespace-nowrap hidden md:block">Counselors</span>
            </Link>

            <Link to="/chat" className="absolute bottom-10 left-4 transform -translate-x-1/2 translate-y-1/2 flex items-center gap-2 text-gray-800 hover:text-synapse-deep transition-colors z-20">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                {/* <img src="/path-to-your-chatbot-icon.png" alt="Chatbot" className="w-4 h-4" /> */}
              </div>
              <span className="text-sm font-medium whitespace-nowrap hidden md:block">Chatbot</span>
            </Link>

            <Link to="/resources" className="absolute bottom-10 right-4 transform translate-x-1/2 translate-y-1/2 flex items-center gap-2 text-gray-800 hover:text-synapse-deep transition-colors z-20">
              <span className="text-sm font-medium whitespace-nowrap hidden md:block">Resources</span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                {/* <img src="/path-to-your-resources-icon.png" alt="Resources" className="w-4 h-4" /> */}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}