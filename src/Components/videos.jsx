import React from "react";
import { useState , useEffect } from "react";
import videos from "../assets/videos/videolinks.json";
import { Heart } from "lucide-react";
import { Heart as HeartFilled } from "lucide-react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, deleteDoc, getDoc, collection, getDocs } from "firebase/firestore";

const VideoSection = () => {
  const [videonum, setVideonum] = useState(3);
  const [saved, setSaved] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
    const fetchSaved = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const savedRef = collection(db, "users", user.uid, "savedVideos");
      const snapshot = await getDocs(savedRef);
      const savedIds = snapshot.docs.map((doc) => doc.id);
      setSaved(savedIds);
    };

    fetchSaved();
  }, [auth.currentUser]);

    const toggleSave = async (video) => {
  const user = auth.currentUser;
  if (!user) {
    navigate("/login");
    return;
  }

  const videoId = video.id.toString();   // Always convert once
  const videoRef = doc(db, "users", user.uid, "savedVideos", videoId);
  const existing = await getDoc(videoRef);

  if (existing.exists()) {
    await deleteDoc(videoRef);
    setSaved((prev) => prev.filter((vid) => vid !== videoId));
    console.log("Removed:", videoId);
  } else {
    await setDoc(videoRef, {
      id: videoId,
      title: video.title,
      link: video.link,
      savedAt: new Date(),
    });
    setSaved((prev) => [...prev, videoId]);
    console.log("Saved:", videoId);
  }
};




  const handleLoadMore = () => {
      setVideonum((prev) => Math.min(prev + 3, videos.length));
  };
  const handleShowLess = () => {
    setVideonum(3);
  };


  return (
    <section className="py-10 px-6">
      <h3 className="text-3xl font-bold text-slate-100 mb-8 border-b-2 border-slate-700 pb-3">🎥 Video Resources</h3>
      <div className="flex flex-wrap gap-6">
        {videos.slice(0, videonum).map((video) => (
          <div className="relative w-[32%] h-[40vh]" key={video.id}>
          <iframe
            key={video.id}
            className="rounded-lg relative w-[100%] h-[100%]"
            src={video.link}
            title={video.title}
            allowFullScreen
          ></iframe>

           <button
           
              onClick={() => {
                toggleSave(video);
                console.log("Clicked:", video);
              }}
              className="absolute bottom-3 right-3 bg-slate-800/50 backdrop-blur-sm p-2 rounded-full hover:bg-slate-700/50 transition-colors"
            >
              {saved.includes(video.id.toString()) ? (
                <HeartFilled className="w-5 h-5 text-red-500 fill-red-500" />
              ) : (
                <Heart className="w-5 h-5 text-slate-300" />
              )}
            </button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Load More
        </button>
        <button onClick={handleShowLess} className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded ${videonum === 3 ? 'hidden' : ''} ml-4`}>
          Show Less
        </button>
      </div>
    </section>
  );
};

export default VideoSection;
