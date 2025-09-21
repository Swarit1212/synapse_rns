import React, { useState, useEffect } from "react";

const quotes = [
  "This too shall pass.",
  "It’s okay to ask for help.",
  "Your feelings are valid.",
  "One step at a time."
];

const QuotesCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-indigo-600 text-white py-6 text-center">
      <p className="text-lg italic">{quotes[index]}</p>
    </section>
  );
};

export default QuotesCarousel;
