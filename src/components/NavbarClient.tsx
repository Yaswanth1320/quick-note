"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Mail,
  LogOut,
  LogIn,
  NotebookPen,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { ModeToggle } from "./ThemeButton";

interface NavbarClientProps {
  session: any;
}

const NavbarClient: React.FC<NavbarClientProps> = ({ session }) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  const navLink = (href: string, label: string, Icon: React.ElementType) => (
    <Link
      href={href}
      className={`relative group p-2 rounded-lg transition-all duration-300 ${
        pathname === href
          ? "bg-primary/20 text-primary dark:bg-primary/30"
          : "text-muted-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-card text-foreground dark:bg-muted dark:text-muted-foreground px-2 py-1 rounded-md shadow-lg">
        {label}
      </span>
    </Link>
  );

  return (
    <nav className="bg-background/80 dark:bg-background/90 backdrop-blur-md shadow-md dark:shadow-lg border-b border-border/40 dark:border-border/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold text-primary hover:scale-105 transition-transform"
          >
            <NotebookPen className="h-6 w-6" />
            <span>QuickNotes</span>
          </Link>

          {/* Nav */}
          <div className="flex items-center space-x-4">
            {navLink("/", "Home", Home)}

            {session && navLink("/dashboard", "Dashboard", LayoutDashboard)}

            {navLink("/contact", "Contact", Mail)}

            {/* Auth */}
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
                <Link
                  href="/sign-up"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:scale-105 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {/* User Avatar */}
                <div className="relative group">
                  <Image
                    src={session.user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    width={26}
                    height={26}
                    className="rounded-full border-2 border-primary/40 shadow-md dark:shadow-lg"
                  />
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-card text-foreground dark:bg-muted dark:text-muted-foreground px-2 py-1 rounded-md shadow">
                    {session.user?.name || "User"}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="relative group p-2 rounded-lg transition-all duration-300 text-muted-foreground hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-card text-foreground dark:bg-muted dark:text-muted-foreground px-2 py-1 rounded-md shadow">
                    Logout
                  </span>
                </button>
              </>
            )}

            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarClient;
