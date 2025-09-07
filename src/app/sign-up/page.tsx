"use client";

import { useState } from "react";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { signUpUser } from "@/actions/users";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      toast.error("Passwords do not match", {
        description: "Please make sure both passwords are the same.",
      });
      setLoading(false);
      return;
    }

    const result = await signUpUser(email, password, name);

    if (result.success) {
      toast.success("Account created 🎉", {
        description: "You can now log in to QuickNotes.",
      });
      router.push("/login");
    } else {
      toast.error("Signup failed", {
        description: result.message,
      });
    }

    setLoading(false);
  };

  const GoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-background animate-fade-in-up">
      <div className="w-full max-w-sm p-6 rounded-xl shadow-md bg-card text-card-foreground">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-foreground">
          Create Account
        </h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Sign up and start capturing your ideas.
        </p>

        {/* Form */}
        <form onSubmit={handleSignup} className="mt-6 space-y-4 text-sm">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              name="name"
              type="text"
              required
              placeholder="Full Name"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md border bg-background text-foreground focus:ring-2 focus:ring-primary transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md border bg-background text-foreground focus:ring-2 focus:ring-primary transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md border bg-background text-foreground focus:ring-2 focus:ring-primary transition"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              name="confirm"
              type="password"
              required
              placeholder="Confirm Password"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md border bg-background text-foreground focus:ring-2 focus:ring-primary transition"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-primary text-primary-foreground font-medium shadow hover:scale-105 transition-transform duration-300 text-sm"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign up"}
          </button>

          {/* Google Signup */}
          <button
            onClick={GoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border bg-background font-medium hover:bg-muted transition text-sm"
          >
            <FcGoogle className="h-4 w-4" />
            Continue with Google
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
