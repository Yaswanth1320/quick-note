"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const signInUser = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });
    return { success: true, message: "User signed in successfully" };
  } catch (error) {
    const e = error as Error;

    return { success: false, message: e.message || "User sign in failed" };
  }
};

export const signUpUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
    return { success: true, message: "User signed up successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "User sign up failed" };
  }
};
