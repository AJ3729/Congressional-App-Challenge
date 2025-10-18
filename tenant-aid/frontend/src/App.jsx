import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Resources from "./pages/Resources";
import "./css/App.css";

function App() {
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();

      if (hash === "#chat") {
        setActivePage("chat");
      } else if (hash === "#resources") {
        setActivePage("resources");
      } else {
        setActivePage("home"); // default page
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash); // listen for hash changes

    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  return (
    <div className="App">
      <Sidebar />
      
      {/* Only render the component if the hash matches */}
      {activePage === "home" && <Home />}
      {activePage === "chat" && <Chat />}
      {activePage === "resources" && <Resources />}
    </div>
  );
}

export default App;
