import React from "react";
import "../css/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo"><a href="#home">TenantAid</a></h2>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#chat">Bot Chat</a></li>
        <li><a href="#resources">Know Your Rights</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
