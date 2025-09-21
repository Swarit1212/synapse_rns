import React from 'react'
import Navbar from './Navbar';
import Footer from './footer';
import Hero from './hero.jsx';
import QuotesCarousel from './quotes.jsx';
import Button from './Button';
import { Link } from "react-router-dom";
import OurApproach from './approach.jsx';
export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      {/* <QuotesCarousel/> */}
      <OurApproach/>
      <Footer/>
      <div className="fixed bottom-24 right-8 z-50">
      <Link to="/chat" className="bg-[#463A64] text-white p-4 rounded-full shadow-lg hover:bg-[#5a4b79] transition-colors duration-300">
        🤖
      </Link>
    </div>
    </div>
  )
}
