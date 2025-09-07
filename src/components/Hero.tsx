"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const Hero = () => {
  const { data: session } = authClient.useSession();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center text-center animate-fade-in-down">
      {/* Dynamic Welcome Text */}
      <div
        className={`transition-all duration-700 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">
          <span className="block mt-2">Welcome to QuickNotes</span>
        </h1>
      </div>

      {/* Subheading */}
      <p
        className={`mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        The simplest way to capture your thoughts and ideas.
      </p>

      {/* Get Started Button */}
      <div
        className={`mt-8 transition-all duration-1000 delay-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {!session ? (
          <Link
            href="/login"
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            Get Started
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            Dashboard
          </Link>
        )}
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full mb-6" />
    </section>
  );
};

export default Hero;
