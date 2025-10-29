import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../css/Sidebar.css";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [linksHeight, setLinksHeight] = useState(0);
  const linksRef = useRef(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (linksRef.current) {
      setLinksHeight(linksRef.current.scrollHeight);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <div
      className="sidebar"
      style={{
        height: open ? 80 + linksHeight + 80 : 80,
        borderBottomRightRadius: "20px",
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
        <li><a href="#home">{t("home")}</a></li>
        <li><a href="#chat">{t("chat")}</a></li>
        <li><a href="#resources">{t("rights")}</a></li>
        <li><a href="#form">{t("form")}</a></li>
        <li className="language-dropdown">
          <label htmlFor="language-select" className="language-label">
            {t("language")}:
          </label>
          <select
            id="language-select"
            value={i18n.language}
            onChange={handleLanguageChange}
            className="language-select"
          >
            <option value="EN">English</option>
            <option value="ES">Español</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
