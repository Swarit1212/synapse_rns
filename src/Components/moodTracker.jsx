import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function MoodTracker() {
    const [moods, setMoods] = useState([]);
    const user = auth.currentUser;
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchMoods = async () => {
            const moodsQuery = query(collection(db, "users", user.uid, "moods"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(moodsQuery);
            
            // Simplified logic: Assume all dates are strings and convert them to Date objects for display
            const data = querySnapshot.docs.map(doc => {
                const docData = doc.data();
                return { 
                    id: doc.id, 
                    mood: docData.mood,
                    date: new Date(docData.date) // Convert the date string to a Date object
                };
            });
            setMoods(data);
        };

        fetchMoods();
    }, [user]);

    const addMood = async () => {
        if (input.trim() && user) {
            const newMood = {
                // CHANGE: Save date as a string to match the old data format
                date: new Date().toLocaleDateString(), 
                mood: input.trim()
            };
            const docRef = await addDoc(collection(db, "users", user.uid, "moods"), newMood);
            // Convert the new date string to a Date object for immediate display
            setMoods(prev => [{ id: docRef.id, ...newMood, date: new Date(newMood.date) }, ...prev]);
            setInput("");
        }
    };

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-6">How are you feeling today?</h2>
            
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="e.g., Optimistic, Tired, Content..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addMood()}
                    className="flex-grow w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button 
                    onClick={addMood}
                    disabled={!input.trim()}
                    className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed"
                >
                    Log
                </button>
            </div>

            <div className="mt-8">
                {moods.length > 0 ? (
                    <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {moods.map((m) => (
                            <li key={m.id} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-md">
                                <span className="font-medium text-slate-200">{m.mood}</span>
                                <span className="text-slate-400 text-sm">
                                    {m.date.toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-slate-400 mt-8 p-4 bg-slate-700/30 rounded-md">
                        <p>No moods logged yet. Add one above to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MoodTracker;