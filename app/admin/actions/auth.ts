"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/utils/db";
import User from "@/models/User";

const SESSION_COOKIE = "admin_session";
const secretKey = process.env.JWT_SECRET || "fallback_secret_key";
const key = new TextEncoder().encode(secretKey);

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) {
    return { error: "Invalid credentials." };
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return { error: "Invalid credentials." };
  }

  // Create JWT
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  const session = await new SignJWT({ userId: user._id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires,
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  
  if (!session?.value) return false;

  try {
    await jwtVerify(session.value, key);
    return true;
  } catch (error) {
    return false;
  }
}
