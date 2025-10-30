import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../css/Chat.css";

interface Message {
  id: string | number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/chat");
        if (!res.ok) throw new Error("fetch failed");
        const data: Message[] = await res.json();

        setMessages((prev) => {
          const prevJSON = JSON.stringify(prev);
          const newJSON = JSON.stringify(data);
          return prevJSON === newJSON ? prev : data;
        });
        setFetchError(null);
      } catch (err: any) {
        console.error(t("fetchFail"), err);
        setFetchError(err.message);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;
    setLoading(true);

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputValue.trim() }),
      });

      if (!res.ok) throw new Error("send failed");

      const data = await res.json();
      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.bot?.text || data.bot || t("fetch failed"),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setInputValue("");
      setFetchError(null);
    } catch (err: any) {
      console.error(t("fetchError"), err);
      setFetchError(err.message);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) handleSend();
  };

  return (
    <div className="chat-container">
      <div className="chat-card">
        {/* Header */}
        <div className="chat-header">
          <div className="bot-avatar">
            <Bot />
          </div>
          <div>
            <div>Tenant-Aid Bot</div>
            <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>Always here to help</div>
          </div>
        </div>

        {/* Chat window */}
        <div className="chat-window">
          {fetchError && (
            <div className="error-message">
              Error: {fetchError}. Make sure your backend is running on{" "}
              <code>http://localhost:5000</code>.
            </div>
          )}

          {messages.length === 0 && !fetchError && (
            <div className="welcome-message">
              Welcome to Tenant-Aid! Ask me anything about NYC tenant rights.
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`message-wrapper ${message.sender}`}>
              <div className={`message-avatar ${message.sender}`}>
                {message.sender === "bot" ? <Bot /> : <User />}
              </div>
              <div className={`message ${message.sender}`}>{message.text}</div>
            </div>
          ))}

          {loading && (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading || !inputValue.trim()}>
            <Send style={{ marginRight: "4px" }} />
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#e0f2ff", border: "1px solid #90cdf4", borderRadius: "8px" }}>
        <p style={{ fontSize: "0.875rem", color: "#1e3a8a" }}>
          <strong>Note:</strong> This assistant provides general information only and is
          not a substitute for legal advice. For specific issues, please consult a
          qualified attorney or tenant advocacy organization.
        </p>
      </div>
    </div>
  );
}
