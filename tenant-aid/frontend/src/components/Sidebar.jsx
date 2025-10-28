import React, { useState, useRef, useEffect } from "react";
import "../css/Sidebar.css";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const linksRef = useRef(null);
  const [linksHeight, setLinksHeight] = useState(0);

  useEffect(() => {
    if (linksRef.current) {
      setLinksHeight(linksRef.current.scrollHeight);
    }
  }, []);

  return (
    <div
      className="sidebar"
      style={{
        height: open ? 80 + linksHeight + 40 : 80, // logo + links + spacing
        borderBottomRightRadius: "20px",           // always rounded
        transition: "height 0.3s ease, border-radius 0.3s ease",
      }}
    >
      <h2 className="logo" onClick={() => setOpen(!open)}>
        TenantAid
      </h2>

      <ul
        ref={linksRef}
        className="nav-links"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-20px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <li><a href="#home">Home</a></li>
        <li><a href="#chat">Bot Chat</a></li>
        <li><a href="#resources">Know Your Rights</a></li>
        <li><a href="#form">Help Form</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;