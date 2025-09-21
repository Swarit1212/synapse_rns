import React from "react";
import counsellors from "../Data/counsellors";
import Footer from './footer';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function CounsellorList() {
  const list = counsellors.map((counsellor) => (
    // Card Container: Now has a solid, opaque background
    <li key={counsellor.id}>
      <Link 
        to={`/counsellorDetail/${counsellor.id}`} 
        className="
          block p-6 rounded-xl h-full
          bg-slate-800/80 backdrop-blur-sm
          border border-slate-700       
          shadow-lg hover:shadow-indigo-500/20
          transition-all duration-300 transform hover:-translate-y-1 
          hover:border-indigo-500
        "
      >
        {/* Card Content: The text colors now have a reliable background */}
        <h2 className="text-2xl font-bold text-slate-100 mb-2">{counsellor.name}</h2>
        <p className="text-indigo-300 font-medium text-md mb-3">{counsellor.specialization}</p>
        
        <div className="space-y-1 text-sm text-slate-400">
          <p><span className="font-semibold text-slate-300">Position:</span> {counsellor.position}</p>
          <p><span className="font-semibold text-slate-300">Email:</span> {counsellor.email}</p>
          <p><span className="font-semibold text-slate-300">Timings:</span> {counsellor.timings}</p>
          <p><span className="font-semibold text-slate-300">Location:</span> {counsellor.location}</p>
        </div>
      </Link>
    </li>
  ));

  return (
    // Main page container with your new background image
    <div className="min-h-screen bg-hero-pattern bg-cover bg-center text-white font-sans flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 flex-grow">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 drop-shadow-lg">
          Our Esteemed Counsellors
        </h1>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list}
        </ul>
      </main>
      
      <Footer />
    </div>
  );
}