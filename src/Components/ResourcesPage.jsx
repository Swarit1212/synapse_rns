import React from 'react';
import Navbar from './Navbar';
import Footer from './footer';
import ArticlesSection from './articles';
import VideoSection from './videos';
import AudioSection from './audios';
import InteractiveTools from './tools';

export default function ResourcePage() {
  return (
    <div className="min-h-screen bg-hero-pattern bg-cover bg-center text-white font-sans flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 flex-grow">
        

        {/* Renders each of your resource sections in the new order */}
        <div className="space-y-20">
          <VideoSection />
          <AudioSection />
          <InteractiveTools />
          <ArticlesSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}