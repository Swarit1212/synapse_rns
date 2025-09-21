import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import counsellors from "../Data/counsellors";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "./Navbar";
import Footer from "./footer";
import ReviewForm from "./ReviewForm"; // Import the child component

export default function CounsellorDetail() {
    const { id } = useParams();
    const cid = parseInt(id, 10);
    const counsellor = counsellors.find((c) => c.id === cid);

    const [reviews, setReviews] = useState([]);
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (isNaN(cid)) return;
        const q = query(
            collection(db, "reviews"),
            where("counsellorId", "==", cid),
            orderBy("createdAt", "desc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setReviews(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return () => unsubscribe();
    }, [cid]);
    
    const handleReviewSuccess = () => {
        setIsReviewFormVisible(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    if (!counsellor) {
        // ... 'not found' section remains the same
    }

    return (
        <div className="min-h-screen bg-hero-pattern bg-cover bg-center text-white font-sans flex flex-col">
            <Navbar />
            
            <main className="container mx-auto px-4 py-12 md:py-16 flex-grow">
                {/* Counsellor Information Card with details RESTORED */}
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-2xl mb-12 border border-slate-700">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">{counsellor.name}</h2>
                    <p className="text-xl md:text-2xl font-medium text-indigo-300 mb-6">{counsellor.specialization}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-slate-300">
                        <p><strong className="font-semibold text-slate-100">Position:</strong> {counsellor.position}</p>
                        <p><strong className="font-semibold text-slate-100">Email:</strong> {counsellor.email}</p>
                        <p><strong className="font-semibold text-slate-100">Timings:</strong> {counsellor.timings}</p>
                        <p><strong className="font-semibold text-slate-100">Location:</strong> {counsellor.location}</p>
                    </div>
                </div>

                {/* The rest of the component (success message, toggle button, form, and reviews) remains the same */}
                
                {showSuccessMessage && (
                    <div className="my-8 p-4 bg-green-900/50 border border-green-500 rounded-md text-center text-green-300 font-semibold">
                        ✅ Review submitted successfully!
                    </div>
                )}

                {!isReviewFormVisible && (
                    <div className="text-center mb-12">
                        <button 
                            onClick={() => setIsReviewFormVisible(true)}
                            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Add Your Review
                        </button>
                    </div>
                )}
                
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isReviewFormVisible ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ReviewForm 
                        counsellorId={cid}
                        onReviewSubmitSuccess={handleReviewSuccess}
                        onCancel={() => setIsReviewFormVisible(false)}
                    />
                </div>

                <div>
                    <h3 className="text-3xl font-bold text-slate-100 mb-6 border-b-2 border-slate-700 pb-3">
                        Reviews
                    </h3>
                    {/* ... reviews list ... */}
                </div>
            </main>

            <Footer />
        </div>
    );
}