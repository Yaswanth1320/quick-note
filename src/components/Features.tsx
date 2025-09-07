"use client";

import { useEffect, useState } from "react";
import { File, Globe, AppWindow } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    name: "Cross-Platform",
    subtitle: "Seamless everywhere",
    description:
      "QuickNotes works on web, mobile, and desktop. Capture ideas anywhere and sync instantly.",
    icon: AppWindow,
    details: ["Web, iOS, Android", "Offline support", "Cloud sync"],
  },
  {
    name: "Simple Sharing",
    subtitle: "One click away",
    description:
      "Share notes effortlessly with teammates, friends, or family. Collaborate in real-time.",
    icon: Globe,
    details: ["Secure share links", "Collaboration mode", "Permissions"],
  },
  {
    name: "Easy Organization",
    subtitle: "Stay clutter-free",
    description:
      "Stay organized with tags, folders, and search. Find what you need instantly.",
    icon: File,
    details: ["Folders & tags", "Smart search", "Pin important notes"],
  },
];

const Features = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mx-auto mt-20 max-w-7xl px-6 lg:px-8 animate-fade-in-up">
      {/* Section Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <p
          className={`mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl transition-opacity duration-1000 delay-200 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Powerful Features
        </p>
        <p
          className={`mt-4 text-base leading-7 text-muted-foreground transition-opacity duration-1000 delay-400 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          QuickNotes is simple, fast, and powerful — built to keep you focused
          on your ideas.
        </p>
      </div>

      {/* Flip Cards */}
      <div className="mx-auto mt-14 flex flex-wrap justify-center gap-x-6 gap-y-5">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.name}
            feature={feature}
            delay={index * 200}
          />
        ))}
      </div>
      <div className="mx-auto mt-26 w-24 h-1 bg-primary rounded-full" />
    </section>
  );
};

export default Features;
