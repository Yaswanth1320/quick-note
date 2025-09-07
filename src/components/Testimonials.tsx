"use client";

import { Quote } from "lucide-react";
import Image from "next/image";

export interface Testimonial {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    title: "Boosted my productivity",
    content:
      "QuickNotes has completely changed the way I take notes. It’s fast, simple, and always available on all my devices.",
    author: {
      name: "Sarah Johnson",
      role: "Student",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  },
  {
    id: 2,
    title: "Perfect for teamwork",
    content:
      "Sharing notes with my team is seamless. We collaborate in real-time, and it keeps everyone on the same page.",
    author: {
      name: "David Kim",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  },
  {
    id: 3,
    title: "Distraction-free writing",
    content:
      "I love the minimal design. It helps me stay focused when I’m drafting articles or brainstorming new ideas.",
    author: {
      name: "Emily Carter",
      role: "Writer",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  },
];

export default function Testimonials({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  return (
    <section className="mx-auto my-24 max-w-6xl px-6 lg:px-8">
      <h2 className="text-center text-3xl font-bold text-foreground">
        What Our Users Say
      </h2>
      <p className="mt-2 text-center text-muted-foreground">
        Real experiences from people who use QuickNotes daily.
      </p>

      {/* 3-card grid */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {testimonials.slice(0, 3).map((t) => (
          <div
            key={t.id}
            className="relative rounded-2xl border border-border bg-card p-6 shadow-md transition-colors hover:border-primary flex flex-col justify-between"
            style={{ minHeight: 320 }}
          >
            {/* Floating quote icon */}
            <Quote className="absolute top-4 right-4 h-6 w-6 text-muted-foreground/40" />

            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground">{t.title}</h3>

            {/* Content (always visible) */}
            <p className="mt-2 text-sm text-muted-foreground">{t.content}</p>

            {/* Author */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden border">
                <Image
                  src={t.author.image}
                  alt={t.author.name}
                  width={90}
                  height={90}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-foreground">{t.author.name}</p>
                <p className="text-xs text-muted-foreground">{t.author.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
