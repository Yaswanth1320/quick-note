"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) setIsVisible(true);
    else setIsVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 animate-fade-in-up">
      <button
        onClick={scrollToTop}
        className="bg-primary text-primary-foreground rounded-full p-3 hover:scale-110 transition-transform duration-300 shadow-lg"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default BackToTopButton;
