import React from "react";
import "../css/Message.css";

function Message({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`chat-message ${isUser ? "user" : "bot"}`}>
      <div className="bubble">{text}</div>
    </div>
  );
}

export default Message;
