"use client";

import { motion } from "motion/react";
import {
  Mail,
  MessageSquare,
  Phone,
  Github,
  Linkedin,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-5 left-12 flex bg-primary items-center gap-2 text-primary font-medium cursor-pointer backdrop-blur-md px-3 py-3 rounded-full shadow transition-transform z-20"
      >
        <ChevronLeft className="h-5 w-5 text-white dark:text-black" />
      </button>

      {/* Background animated blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-secondary/20 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-16">
        {/* Left Side: Contact Info */}
        <div className="space-y-8">
          <motion.h1
            className="text-4xl font-bold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Let’s Connect ✨
          </motion.h1>
          <p className="text-muted-foreground">
            Have questions, feedback, or just want to say hello? We’d love to
            hear from you.
          </p>

          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: "Email Us",
                desc: "psybuilds@gmail.com",
              },
              {
                icon: Phone,
                title: "Call Us",
                desc: "+1 (555) 123-4567",
              },
              {
                icon: MessageSquare,
                title: "Live Chat",
                desc: "Available Mon–Fri, 9am–5pm",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 rounded-xl bg-card p-5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <item.icon className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex space-x-4 mt-8">
            <a
              href="https://www.linkedin.com/in/yashwanth-paravathala-380028322/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card shadow hover:scale-110 transition-transform"
            >
              <Linkedin className="h-6 w-6 text-primary" />
            </a>
            <a
              href="https://github.com/Yaswanth1320"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card shadow hover:scale-110 transition-transform"
            >
              <Github className="h-6 w-6 text-primary" />
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <motion.div
          className="backdrop-blur-xl bg-card/70 rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Send us a message 💌
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border px-4 py-3 bg-background text-foreground"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border px-4 py-3 bg-background text-foreground"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-md border px-4 py-3 bg-background text-foreground"
              required
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.05 }}
              className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground shadow-md"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
