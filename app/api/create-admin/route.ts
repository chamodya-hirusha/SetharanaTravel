import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/utils/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    const email = "admin@setharana.com";
    const plainPassword = "setharana2024";

    // Check if admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Admin user already exists." },
        { status: 200 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(plainPassword, salt);

    const newAdmin = new User({
      email,
      passwordHash,
      role: "admin",
    });

    await newAdmin.save();

    return NextResponse.json(
      {
        message: "Admin user created successfully!",
        email,
        password: plainPassword,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create admin user", details: error.message },
      { status: 500 }
    );
  }
}
