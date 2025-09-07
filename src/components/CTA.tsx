"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative mx-auto mt-24 max-w-6xl px-6 lg:px-8 text-center">
      <div
        className={`rounded-3xl bg-primary px-8 py-16 shadow-xl transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground">
          Ready to take smarter notes?
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          Join thousands of users who already capture, organize, and share their
          ideas effortlessly with QuickNotes.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/signup"
            className="px-8 py-3 rounded-lg bg-card text-card-foreground font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
