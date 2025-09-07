"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cookie className="h-6 w-6 text-primary" />
          <p className="text-muted-foreground">
            We use cookies to improve your experience.
          </p>
        </div>
        <button
          onClick={acceptCookies}
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:scale-105 transition-transform duration-300"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
