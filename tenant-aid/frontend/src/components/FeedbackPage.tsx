import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import { Textarea } from "./ui/textarea.tsx";
import { Label } from "./ui/label.tsx";
import { Card } from "./ui/card.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.tsx";
import { toast } from "sonner";

export function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "",
    rating: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    console.log("Form submitted:", formData);
    
    setSubmitted(true);
    toast.success("Your feedback has been submitted successfully!");
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        feedbackType: "",
        rating: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Card className="p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl mb-4">Thank You!</h2>
          <p className="text-gray-600 text-lg mb-6">
            We've received your feedback and appreciate you taking the time to help us improve Tenant-Aid.
          </p>
          <p className="text-gray-600">
            If you provided your email, we may follow up with you at <strong>{formData.email}</strong>.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-4">Website Feedback</h1>
        <p className="text-gray-600">
          Help us improve Tenant-Aid! Share your thoughts about the website, report bugs, or suggest new features.
        </p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl mb-4">Your Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name (Optional)</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Provide your email if you'd like us to follow up with you.
                </p>
              </div>
            </div>
          </div>

          {/* Feedback Details */}
          <div>
            <h3 className="text-xl mb-4">Feedback Details</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="feedbackType">Type of Feedback *</Label>
                  <Select
                    required
                    value={formData.feedbackType}
                    onValueChange={(value) => handleSelectChange("feedbackType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="improvement">Suggestion for Improvement</SelectItem>
                      <SelectItem value="content">Content Feedback</SelectItem>
                      <SelectItem value="general">General Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rating">Overall Experience *</Label>
                  <Select
                    required
                    value={formData.rating}
                    onValueChange={(value) => handleSelectChange("rating", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Rate your experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">
                  Your Feedback *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please share your thoughts, report any issues you encountered, or suggest improvements..."
                  rows={8}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Be as detailed as possible. If reporting a bug, include what you were doing when it occurred.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> This feedback form is for website-related comments only. If you need help with a tenant rights issue, please use the chatbot or check the "Your Rights" page.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" className="gap-2">
              <Send className="w-4 h-4" />
              Submit Feedback
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() =>
                setFormData({
                  name: "",
                  email: "",
                  feedbackType: "",
                  rating: "",
                  message: "",
                })
              }
            >
              Clear Form
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}