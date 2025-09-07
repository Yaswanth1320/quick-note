// components/Footer.tsx
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto w-full animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-foreground">QuickNotes</h2>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            The simplest way to capture, organize, and share your ideas.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link
            href="/testimonial"
            className="hover:text-primary transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Socials */}
        <div className="flex space-x-4">
          {[
            { Icon: Github, href: "https://github.com/Yaswanth1320" },
            {
              Icon: Linkedin,
              href: "https://www.linkedin.com/in/yashwanth-paravathala-380028322/",
            },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110"
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Bottom text */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-2 px-6 lg:px-8 py-4">
        <p>
          &copy; {new Date().getFullYear()} QuickNotes. All rights reserved.
        </p>
        <p className="text-xs">Built with ❤️ for productivity.</p>
      </div>
    </footer>
  );
};

export default Footer;
