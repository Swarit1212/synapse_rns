 // src/Components/Chat.js

import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Chat.css'; 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    
    // Add user message immediately
    setMessages(currentMessages => [...currentMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Correct API URL pointing directly to the backend on port 5000
      const response = await axios.post('http://localhost:5000/api/chat', {
        prompt: input,
      });

      // Add chatbot's response
      setMessages(currentMessages => [
        ...currentMessages,
        { text: response.data.reply, sender: 'bot' }
      ]);
      
    } catch (error) {
      console.error('Error fetching data from API:', error);
      
      // Handle the 500 error case with a user-friendly message
      setMessages(currentMessages => [
        ...currentMessages,
        { text: 'Sorry, there was a problem connecting to the support system. Please check the terminal logs for details.', sender: 'bot' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="typing-indicator">...</div>
          </div>
        )}
      </div>
      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How are you feeling today?"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || input.trim() === ''}>Send</button>
      </form>
    </div>
  );
};

export default Chat;