import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../css/Navbar.css";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [activePage, setActivePage] = useState("home"); // default active page

  // Update active page when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActivePage(hash);
      else setActivePage("home");
    };

    window.addEventListener("hashchange", handleHashChange);

    // initialize active page based on current hash
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleClick = (page) => {
    setActivePage(page);
    window.location.hash = page; // update URL hash
  };

  return (
    <div className="navbar">
      <h2 className="logo" onClick={() => handleClick("home")}>
        TenantAid
      </h2>

      <ul className="nav-links">
        <li>
          <a
            href="#home"
            className={activePage === "home" ? "active" : ""}
            onClick={() => handleClick("home")}
          >
            {t("home")}
          </a>
        </li>
        <li>
          <a
            href="#chat"
            className={activePage === "chat" ? "active" : ""}
            onClick={() => handleClick("chat")}
          >
            {t("chat")}
          </a>
        </li>
        <li>
          <a
            href="#rights"
            className={activePage === "rights" ? "active" : ""}
            onClick={() => handleClick("rights")}
          >
            {t("rights")}
          </a>
        </li>
        <li>
          <a
            href="#form"
            className={activePage === "form" ? "active" : ""}
            onClick={() => handleClick("form")}
          >
            {t("form")}
          </a>
        </li>
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

export default Navbar;