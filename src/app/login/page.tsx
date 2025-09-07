"use client";

import { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { signInUser } from "@/actions/users";
import { authClient } from "@/lib/auth-client";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signInUser(email, password);

    if (result.success) {
      toast.success("Login successful", {
        description: "Welcome back to QuickNotes 🚀",
      });
      window.location.href = "/dashboard";
    } else {
      toast.error("Login failed", {
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
          Welcome Back
        </h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Login to continue your notes journey.
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4 text-sm">
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

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-primary text-primary-foreground font-medium shadow hover:scale-105 transition-transform duration-300 text-sm"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
          </button>

          {/* Google Login */}
          <button
            onClick={GoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border bg-background font-medium hover:bg-muted transition text-sm"
          >
            <FcGoogle className="h-4 w-4" />
            Continue with Google
          </button>
        </form>

        {/* Link to Signup */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
