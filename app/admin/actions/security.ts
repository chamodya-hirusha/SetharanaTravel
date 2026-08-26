"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/utils/db";
import User from "@/models/User";

const SESSION_COOKIE = "admin_session";
const secretKey = process.env.JWT_SECRET || "fallback_secret_key";
const key = new TextEncoder().encode(secretKey);

export async function changePasswordAction(formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!currentPassword || !newPassword) {
    return { error: "Please fill out all fields." };
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  
  if (!session?.value) {
    return { error: "Not authenticated." };
  }

  try {
    const { payload } = await jwtVerify(session.value, key);
    const email = payload.email as string;

    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) {
      return { error: "User not found." };
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return { error: "Current password is incorrect." };
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    user.passwordHash = newHash;
    await user.save();

    return { success: true };
  } catch (error) {
    return { error: "Authentication error or server error." };
  }
}
