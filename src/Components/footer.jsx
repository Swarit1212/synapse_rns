// src/Components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12">
      <div className="bg-neutral-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20">📞</span>
            <div className="text-sm">
              <div>Emergency Helpline: +91 1800-123-4567</div>
            </div>
          </div>
          <div className="text-sm text-neutral-300">© {new Date().getFullYear()} College Mental Health Platform</div>
        </div>
      </div>
    </footer>
  );
}
