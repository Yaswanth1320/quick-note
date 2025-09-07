"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Quote } from "lucide-react";
import { addTestimonial, getUserTestimonials } from "@/actions/testimonials";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
}

export default function TestimonialsPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ title: "", content: "", role: "" });

  const [myTestimonials, setMyTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  // Load current user testimonials
  useEffect(() => {
    (async () => {
      setLoadingTestimonials(true);
      const res = await getUserTestimonials();
      if (res.success) setMyTestimonials(res.data);
      setLoadingTestimonials(false);
    })();
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await addTestimonial(form);
      if (res.success) {
        setForm({ title: "", content: "", role: "" });
        toast.success(res.message);
        router.refresh();
        setMyTestimonials((prev) => [res.data, ...prev]);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-center text-foreground">
            Add a Testimonial
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            Your feedback helps us improve QuickNotes.
          </p>

          {/* Form Card */}
          <motion.form
            onSubmit={onSubmit}
            className="mt-10 grid gap-4 rounded-2xl border bg-card p-8 shadow-lg"
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <input
              name="title"
              placeholder="Testimonial Title"
              value={form.title}
              onChange={onChange}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />
            <textarea
              name="content"
              placeholder="Testimonial Content"
              value={form.content}
              onChange={onChange}
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />
            <input
              name="role"
              placeholder="Your Role (e.g., Student, Developer)"
              value={form.role}
              onChange={onChange}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:scale-[1.01] active:scale-[.99] disabled:opacity-60 transition-transform"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
                </>
              ) : (
                "Add Testimonial"
              )}
            </button>
          </motion.form>
        </motion.div>

        {/* Right: User Testimonials */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary" /> Your Testimonials
          </h2>

          {/* Loading skeleton */}
          {loadingTestimonials ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 bg-card rounded-xl border shadow-md space-y-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 bg-muted rounded" />
                      <div className="h-3 w-2/3 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="h-3 w-full bg-muted rounded" />
                  <div className="h-3 w-3/4 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : myTestimonials.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              You haven’t added any testimonials yet.
            </p>
          ) : (
            myTestimonials.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-card rounded-xl border shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={t.authorImage}
                    alt={t.authorName}
                    width={48}
                    height={48}
                    className="rounded-full border object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{t.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t.content}
                    </p>
                    <p className="text-xs text-primary mt-2">
                      — {t.authorName}, {t.authorRole}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
