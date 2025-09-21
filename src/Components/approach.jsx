// src/Components/OurApproach.jsx
import React from "react";
import { Heart, Users, BookOpen, Compass } from "lucide-react"; // icons

const features = [
  {
    title: "Empathy First",
    description: "We listen with compassion and put your feelings at the center of every conversation.",
    icon: Heart,
  },
  {
    title: "Expert Guidance",
    description: "Access resources and professional counsellors to support your personal journey.",
    icon: BookOpen,
  },
  {
    title: "Community Support",
    description: "Find strength in knowing you are not alone — join a community that cares.",
    icon: Users,
  },
  {
    title: "Personal Growth",
    description: "Step by step, we’ll help you build resilience and confidence in yourself.",
    icon: Compass,
  },
];

export default function OurApproach() {
  return (
    <section className="bg-transparent py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#463A64] mb-10">
          Our Approach
        </h2>

        {/* Grid of features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <item.icon className="w-10 h-10 text-[#463A64] mb-4" />
              <h3 className="text-lg font-semibold text-[#463A64] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
