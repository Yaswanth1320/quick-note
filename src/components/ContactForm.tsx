"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center animate-fade-in-down">
        <h2 className="text-2xl font-bold text-primary">Thank you!</h2>
        <p className="mt-4 text-muted-foreground">
          Your message has been sent.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-card p-6 rounded-xl shadow-md animate-fade-in-up"
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" required className="mt-1" />
      </div>
      <Button
        type="submit"
        className="transition-all duration-500 hover:scale-105 hover:shadow-lg"
      >
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
