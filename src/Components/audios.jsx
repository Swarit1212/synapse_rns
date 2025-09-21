import React, { useState, useEffect } from "react";
import { Heart, Heart as HeartFilled, Music } from "lucide-react"; 
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, deleteDoc, getDoc, collection, getDocs } from "firebase/firestore";

import meditation_1 from "../assets/music/meditation-music-1.mp3"
import meditation_2 from "../assets/music/meditation-music-2.mp3"

const audios = [
  { id: 1, title: "Meditation Music 1", link: meditation_1 },
  { id: 2, title: "Meditation Music 2", link: meditation_2 },
];

const AudioSection = () => {


  const [saved, setSaved] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchSaved = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const savedRef = collection(db, "users", user.uid, "savedAudios");
      const snapshot = await getDocs(savedRef);
      const savedIds = snapshot.docs.map((doc) => doc.id);
      setSaved(savedIds);
    };
    fetchSaved();
  }, [auth.currentUser]);
  
  const toggleSave = async (audio) => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }

    const audioId = audio.id.toString();
    const audioRef = doc(db, "users", user.uid, "savedAudios", audioId);
    const existing = await getDoc(audioRef);

    if (existing.exists()) {
      await deleteDoc(audioRef);
      setSaved((prev) => prev.filter((aid) => aid !== audioId));
    } else {
      await setDoc(audioRef, {
        id: audioId,
        title: audio.title,
        link: audio.link,
        savedAt: new Date(),
      });
      setSaved((prev) => [...prev, audioId]);
    }
  };

  return (
    <section>
      <h3 className="text-3xl font-bold text-slate-100 mb-8 border-b-2 border-slate-700 pb-3">
        🎧 Audio Resources
      </h3>
      <div className="space-y-6">
        {audios.map((audio) => (
          <div key={audio.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4 relative shadow-lg">
            
            <button
              onClick={() => toggleSave(audio)}
              className="absolute top-4 right-4 bg-slate-700/50 p-2 rounded-full hover:bg-slate-600/50 transition-colors"
            >
              {saved.includes(audio.id.toString()) ? (
                <HeartFilled className="w-5 h-5 text-red-500 fill-red-500" />
              ) : (
                <Heart className="w-5 h-5 text-slate-300" />
              )}
            </button>

            <div className="flex items-center gap-5">
              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                {/* Use the correctly imported "Music" icon */}
                <Music className="w-10 h-10 text-white/80" />
              </div>

              <div className="flex-grow min-w-0">
                <p className="font-bold text-slate-100 text-lg truncate">{audio.title}</p>
                <p className="text-sm text-slate-400 mb-2">{audio.category}</p>
                <audio controls preload="metadata" className="w-full">
                  <source src={audio.link} type="audio/mpeg" />
                </audio>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AudioSection;
