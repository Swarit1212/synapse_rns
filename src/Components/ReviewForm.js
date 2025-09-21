import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

// Accept props from the parent component
export default function ReviewForm({ counsellorId, onReviewSubmitSuccess, onCancel }) {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [status, setStatus] = useState("typing");
    const [error, setError] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || comment === "" || rating === 0) return;
        setStatus("submitting");
        setError(null);
        try {
            await addDoc(collection(db, "reviews"), {
                studentName: name,
                comment: comment,
                rating: rating,
                counsellorId: counsellorId, // Use the ID from props
                createdAt: new Date(),
            });
            // Call the success function passed from the parent
            onReviewSubmitSuccess();
        } catch (err) {
            setError(err);
            setStatus("typing");
        }
    };
    
    return (
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 mb-12 border border-slate-700">
            <h3 className="text-2xl font-bold text-slate-100 mb-6">Submit Your Review</h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                    <label htmlFor="Name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                {/* Comments Textarea */}
                <div>
                    <label htmlFor="Comments" className="block text-sm font-medium text-slate-300 mb-2">Comments</label>
                    <textarea
                        placeholder="Share your experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                {/* Star Rating */}
                <div>
                    <label htmlFor="Ratings" className="block text-sm font-medium text-slate-300 mb-2">Rating</label>
                    <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => setRating(star)}
                                className={`cursor-pointer text-4xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-slate-600 hover:text-yellow-500'}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={status === 'submitting' || !name || !comment || rating === 0}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed"
                    >
                        {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </form>
            {error && <p className="text-red-400 mt-4">Error: {error.message}</p>}
        </div>
    );
}