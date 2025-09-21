import React, { useState } from "react";
import StressQuiz from "./stress_quiz";
import Worksheets from "./worksheets";
import MoodTracker from "./moodTracker"; // You will need to create this component
import { XMarkIcon } from '@heroicons/react/24/solid';

const tools = [
  { title: "Stress Quiz", desc: "Check your stress levels with a quick quiz" },
  { title: "Mood Tracker", desc: "Log your emotions daily" },
  { title: "Download Worksheets", desc: "Guided journaling & exercises" }
];

const InteractiveTools = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const closeModal = () => setSelectedTool(null);

  return (
    <section>
      <h3 className="text-3xl font-bold text-slate-100 mb-8 border-b-2 border-slate-700 pb-3">
        📊 Interactive Tools
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedTool(tool)} 
            className="
              block group text-left h-full p-6 rounded-xl 
              bg-slate-800/80 backdrop-blur-sm border border-slate-700 shadow-lg 
              transition-all duration-300 transform hover:-translate-y-1 hover:border-indigo-500
            "
          >
            <h4 className="font-bold text-xl text-slate-100">{tool.title}</h4>
            <p className="text-slate-400 mt-2">{tool.desc}</p>
          </button>
        ))}
      </div>

      {/* Themed Popup Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
              <XMarkIcon className="w-8 h-8" />
            </button>

            {selectedTool.title === "Stress Quiz" && <StressQuiz />}
            {selectedTool.title === "Mood Tracker" && <MoodTracker />}
            {selectedTool.title === "Download Worksheets" && <Worksheets />}
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveTools;