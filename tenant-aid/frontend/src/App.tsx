import { useState } from "react";
import "./globals.css";
import "./styles/App.css";
import "./styles/Navbar.css";
import { Navigation } from "./components/Navigation.tsx";
import { HomePage } from "./components/HomePage.tsx";
import { ChatbotPage } from "./components/ChatbotPage.tsx";
import { RightsPage } from "./components/RightsPage.tsx";
import { FeedbackPage } from "./components/FeedbackPage.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "chatbot":
        return <ChatbotPage />;
      case "rights":
        return <RightsPage />;
      case "feedback":
        return <FeedbackPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <Toaster />
    </div>
  );
}
