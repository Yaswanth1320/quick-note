"use client";
import React from "react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <Button
      onClick={handleLogout}
      className="transition-all duration-500 hover:scale-105 hover:shadow-lg"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
