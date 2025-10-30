import { Shield, MessageSquare, BookOpen, FileText, CheckCircle } from "lucide-react";
import { Button } from "./ui/button.tsx";
import { Card } from "./ui/card.tsx";
import { ImageWithFallback } from "./figma/ImageWithFallback.tsx";
import "../styles/Home.css";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Chatbot",
      description: "Get instant answers to your tenant rights questions 24/7",
      action: "chatbot",
    },
    {
      icon: BookOpen,
      title: "Know Your Rights",
      description: "Comprehensive database of tenant rights and regulations",
      action: "rights",
    },
    {
      icon: FileText,
      title: "Share Feedback",
      description: "Help us improve Tenant-Aid by sharing your suggestions",
      action: "feedback",
    },
  ];

  const benefits = [
    "Free legal information and resources",
    "Anonymous and confidential support",
    "Easy-to-understand guidance",
    "Connect with advocacy groups",
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        {/* NYC Skyline Background */}
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1514565131-fce0801e5785?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMHNreWxpbmV8ZW58MXx8fHwxNzYxNzY5MzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="NYC Skyline"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-12 h-12" />
            </div>
            <h1 className="text-5xl mb-6">Know Your Rights as a Tenant</h1>
            <p className="text-xl mb-8 text-white/90">
              Empowering renters with knowledge, support, and resources to navigate
              their tenant rights and resolve housing issues.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => onNavigate("chatbot")}
                className="gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Chat with AI Assistant
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("rights")}
                className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <BookOpen className="w-5 h-5" />
                Browse Your Rights
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12">How We Can Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="p-8 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onNavigate(feature.action)}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Button variant="link" className="p-0">
                    Learn more →
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... remove this code ... */}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-6">Need Help Right Now?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't wait. Start a conversation with our AI assistant or browse
            your tenant rights information today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate("chatbot")}
              className="gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Get Instant Help
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("rights")}
              className="gap-2 border-white/20 text-white hover:bg-white/10"
            >
              <BookOpen className="w-5 h-5" />
              Browse Your Rights
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}