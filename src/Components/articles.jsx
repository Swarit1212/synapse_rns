import React, { useState } from "react";
import { Newspaper } from "lucide-react";
import articles from "../assets/articles/articles.json";

const ArticlesSection = () => {
  const defaultCount = 4;
  const [visibleCount, setVisibleCount] = useState(defaultCount);

  return (
    <section>
      <h3 className="text-3xl font-bold text-slate-100 mb-8 border-b-2 border-slate-700 pb-3 flex items-center gap-3">
        <Newspaper className="w-8 h-8 text-indigo-300" />
        Articles
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.slice(0, visibleCount).map((article, i) => (
          <a
            key={i}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              block p-5 rounded-xl bg-slate-800/80 backdrop-blur-sm 
              border border-slate-700 shadow-lg 
              transition-all duration-300 transform hover:-translate-y-1 hover:border-indigo-500
            "
          >
            <h4 className="text-lg font-semibold text-indigo-300 group-hover:underline">
              {article.title}
            </h4>
          </a>
        ))}
      </div>

      <div className="mt-8">
        {visibleCount < articles.length ? (
          <button onClick={() => setVisibleCount(prev => prev + 4)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Show More
          </button>
        ) : (
          <button onClick={() => setVisibleCount(defaultCount)} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Show Less
          </button>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;