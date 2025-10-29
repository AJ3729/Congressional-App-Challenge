import React, { useState, useEffect, useRef } from "react";
import "../css/Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch existing messages on component mount and poll for updates
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/chat");
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setMessages(data);
        setFetchError(null);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setFetchError(err.message);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    
    try {
      // Send message to backend and get AI response
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input.trim() })
      });
      
      if (!res.ok) throw new Error("Failed to send message");
      
      const data = await res.json();
      // Add both user message and bot response to the chat
      setMessages(prev => [...prev, data.user, data.bot]);
      setInput("");
      setFetchError(null);
    } catch (err) {
      console.error("Failed to send message:", err);
      setFetchError(err.message);
    }
    
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {fetchError && (
          <div className="error-message">
            Error: {fetchError}. Make sure your backend is running on http://localhost:5000
          </div>
        )}
        
        {messages.length === 0 && !fetchError && (
          <div className="welcome-message">
            Welcome to TenantAid! Ask me anything about NYC tenant rights.
          </div>
        )}
        
        {messages.map(({ id, sender, text }) => (
          <div
            key={id}
            className={`message ${sender === "user" ? "user" : "bot"}`}
          >
            {text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading || !input.trim()}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chat;