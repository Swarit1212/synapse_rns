import { useState, useEffect } from "react";
import Footer from './footer';
import { db, auth } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: input,
      user:  auth.currentUser.displayName || auth.currentUser.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div>
      <h2>Student Chatroom</h2>
      <div style={{ border: "1px solid gray", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.user}: </strong>{msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
      <Footer/>
    </div>
  );
}
