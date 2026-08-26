import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Package from "../models/Package";

// Simple env loader
const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

async function run() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI missing");
    process.exit(1);
  }
  await mongoose.connect(MONGODB_URI);
  const packages = await Package.find({}).lean();
  console.log("Database Packages count:", packages.length);
  console.log("Database Packages:", JSON.stringify(packages, null, 2));
  await mongoose.disconnect();
}

run();
