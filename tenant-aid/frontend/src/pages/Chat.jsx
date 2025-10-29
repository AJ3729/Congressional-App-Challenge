import React, { useState, useEffect, useRef } from "react";
import "../css/Chat.css";
import { useTranslation } from "react-i18next";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const messagesEndRef = useRef(null);
  const {t,i18n} = useTranslation();

  // Fetch existing messages and poll for updates
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/chat");
        if (!res.ok) throw new Error(t("fetchFail"));
        const data = await res.json();

        // Only update if messages changed
        setMessages((prevMessages) => {
          const prevJSON = JSON.stringify(prevMessages);
          const newJSON = JSON.stringify(data);
          return prevJSON === newJSON ? prevMessages : data;
        });

        setFetchError(null);
      } catch (err) {
        console.error(t("fetchFail") + ":", err);
        setFetchError(err.message);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
      timestamp: new Date().toISOString(),
    };

    // Optimistic update
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.trim() }),
      });

      if (!res.ok) throw new Error(t("sendFail"));

      const data = await res.json();

      const botMessage = {
        ...data.bot,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setInput("");
      setFetchError(null);
    } catch (err) {
      console.error(t("fetchError") + ":", err);
      setFetchError(err.message);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) handleSend();
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

        {messages.map(({ id, sender, text, timestamp }) => (
          <div key={id} className={`message-wrapper ${sender}`}>
            <div className="message-header">
              <span className="sender-name">
                {sender === "user" ? "You" : "TenantAid Bot"}
              </span>
              {timestamp && (
                <span className="timestamp">
                  {new Date(timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
            <div className={`message ${sender}`}>{text}</div>
          </div>
        ))}

        {/* Spinner at bottom when loading */}
        {loading && <div className="spinner-container"><div className="spinner" /></div>}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          placeholder="Type your message..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = "auto"; // reset height
            e.target.style.height = `${e.target.scrollHeight}px`; // adjust to content
          }}
          onKeyDown={handleKeyDown}
          disabled={loading}
          rows={1}
          className="chat-textarea"
        />
        <button onClick={handleSend} disabled={loading || !input.trim()}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chat;