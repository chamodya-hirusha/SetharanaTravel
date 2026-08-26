import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { uploadImageToImgBB } from "../utils/imgbb";

// Models
import Service from "../models/Service";
import Package from "../models/Package";
import GalleryItem from "../models/Gallery";
import Testimonial from "../models/Testimonial";
import FAQ from "../models/FAQ";

// Data
import {
  servicesData,
  packagesData,
  galleryData,
  testimonialsData,
  faqsData,
} from "../data/travelData";

// Simple env loader to load MONGODB_URI and IMGBB_API_KEY from .env.local
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
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is missing from .env.local");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    // 1. Clear existing data
    console.log("Clearing existing collections...");
    await Promise.all([
      Service.deleteMany({}),
      Package.deleteMany({}),
      GalleryItem.deleteMany({}),
      Testimonial.deleteMany({}),
      FAQ.deleteMany({}),
    ]);
    console.log("Collections cleared.");

    // Helper to upload local images to ImgBB
    const processImage = async (imagePath: string) => {
      if (!imagePath || imagePath.startsWith("http")) return imagePath;

      try {
        const fullPath = path.join(process.cwd(), "public", imagePath);
        if (!fs.existsSync(fullPath)) {
          console.warn(`Local file not found: ${fullPath}`);
          return imagePath;
        }
        
        // If IMGBB key is available, upload
        if (process.env.IMGBB_API_KEY) {
          const fileBuffer = fs.readFileSync(fullPath).toString("base64");
          const url = await uploadImageToImgBB(fileBuffer);
          if (url) {
            console.log(`Uploaded ${imagePath} -> ${url}`);
            return url;
          }
        }
        return imagePath;
      } catch (error) {
        console.error(`Error processing image ${imagePath}:`, error);
        return imagePath;
      }
    };

    // 2. Process Packages
    console.log("Processing Packages...");
    const newPackages = [];
    for (const pkg of packagesData) {
      const imgUrl = await processImage(pkg.image);
      newPackages.push({
        title: pkg.title,
        location: pkg.location,
        duration: pkg.duration,
        price: pkg.price,
        originalPrice: pkg.originalPrice || undefined,
        image: imgUrl,
        features: pkg.features,
        isPopular: pkg.isPopular || false,
        category: pkg.category || "Local",
      });
    }

    // 3. Process Gallery
    console.log("Processing Gallery...");
    const newGallery = [];
    for (const item of galleryData) {
      const imgUrl = await processImage(item.url);
      newGallery.push({
        url: imgUrl,
        caption: item.caption,
        category: item.category,
      });
    }

    // 4. Insert data
    console.log("Inserting new seed data...");
    await Promise.all([
      Service.insertMany(servicesData),
      Package.insertMany(newPackages),
      GalleryItem.insertMany(newGallery),
      Testimonial.insertMany(testimonialsData),
      FAQ.insertMany(faqsData),
    ]);

    console.log("\nDatabase seeded successfully!");
    console.log(`- Services: ${servicesData.length}`);
    console.log(`- Packages: ${newPackages.length}`);
    console.log(`- Gallery Items: ${newGallery.length}`);
    console.log(`- Testimonials: ${testimonialsData.length}`);
    console.log(`- FAQs: ${faqsData.length}\n`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
