"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Target, HelpCircle, Eye, Rocket } from "lucide-react";

const AboutPage = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative mx-auto max-w-5xl px-6 lg:px-12 py-20">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition"
        aria-label="Go back"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      {/* Heading */}
      <div className="text-center">
        <h1
          className={`text-4xl sm:text-5xl font-bold tracking-tight text-foreground transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          About QuickNotes
        </h1>
        <p
          className={`mt-4 text-lg text-muted-foreground transition-all duration-1000 delay-200 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          The simplest way to capture, organize, and share your ideas.
        </p>
      </div>

      {/* Content */}
      <div className="mt-16 space-y-12">
        {/* Mission */}
        <section
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              Our Mission
            </h2>
          </div>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            QuickNotes was built to simplify note-taking for everyone. In a
            world full of distractions, we believe that capturing your thoughts
            should be fast, effortless, and beautifully organized.
          </p>
        </section>

        {/* Why QuickNotes */}
        <section
          className={`transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              Why QuickNotes?
            </h2>
          </div>
          <ul className="mt-3 space-y-2 text-base text-muted-foreground list-disc pl-6">
            <li>Cross-platform access on web, iOS, and Android.</li>
            <li>
              Offline-first — jot down notes without worrying about internet.
            </li>
            <li>Smart organization with tags, folders, and powerful search.</li>
            <li>Simple and secure sharing with teammates or friends.</li>
            <li>Modern, distraction-free design that keeps you focused.</li>
          </ul>
        </section>

        {/* Vision */}
        <section
          className={`transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              Our Vision
            </h2>
          </div>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            We envision QuickNotes as your digital second brain — a space where
            your ideas flow freely, stay organized, and grow with you. Whether
            you’re a student, a professional, or a creator, QuickNotes is here
            to adapt to your workflow.
          </p>
        </section>

        {/* Get Started */}
        <section
          className={`transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              Get Started
            </h2>
          </div>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Ready to simplify your note-taking? Create an account today and
            start capturing your ideas in seconds.
          </p>
        </section>
      </div>

      {/* Divider */}
      <div
        className={`mx-auto mt-20 w-32 h-1 bg-primary rounded-full transition-all duration-1000 delay-700 ${
          visible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        }`}
      />
    </section>
  );
};

export default AboutPage;
