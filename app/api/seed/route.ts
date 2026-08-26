import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import connectToDatabase from "@/utils/db";
import { uploadImageToImgBB } from "@/utils/imgbb";

// Models
import Service from "@/models/Service";
import Package from "@/models/Package";
import GalleryItem from "@/models/Gallery";
import Testimonial from "@/models/Testimonial";
import FAQ from "@/models/FAQ";

// Data
import {
  servicesData,
  packagesData,
  galleryData,
  testimonialsData,
  faqsData,
} from "@/data/travelData";

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Clear existing data
    await Promise.all([
      Service.deleteMany({}),
      Package.deleteMany({}),
      GalleryItem.deleteMany({}),
      Testimonial.deleteMany({}),
      FAQ.deleteMany({}),
    ]);

    // Helper to upload local images to ImgBB
    const processImage = async (imagePath: string) => {
      if (!imagePath || imagePath.startsWith("http")) return imagePath;

      try {
        const fullPath = path.join(process.cwd(), "public", imagePath);
        // Read file as base64
        const fileBuffer = await fs.readFile(fullPath, { encoding: "base64" });
        
        // Upload to ImgBB
        const url = await uploadImageToImgBB(fileBuffer);
        return url || imagePath;
      } catch (error) {
        console.error(`Error processing image ${imagePath}:`, error);
        return imagePath; // fallback to original if it fails
      }
    };

    // 2. Process Packages
    console.log("Processing Packages...");
    const newPackages = await Promise.all(
      packagesData.map(async (pkg) => {
        const newImage = await processImage(pkg.image);
        return {
          title: pkg.title,
          location: pkg.location,
          duration: pkg.duration,
          price: pkg.price,
          originalPrice: pkg.originalPrice || undefined,
          image: newImage,
          features: pkg.features,
          isPopular: pkg.isPopular || false,
          category: pkg.category || "Local",
        };
      })
    );

    // 3. Process Gallery
    console.log("Processing Gallery...");
    const newGallery = await Promise.all(
      galleryData.map(async (item) => {
        const newImage = await processImage(item.url);
        return { ...item, url: newImage };
      })
    );

    // 4. Insert data
    await Promise.all([
      Service.insertMany(servicesData),
      Package.insertMany(newPackages),
      GalleryItem.insertMany(newGallery),
      Testimonial.insertMany(testimonialsData),
      FAQ.insertMany(faqsData),
    ]);

    return NextResponse.json(
      {
        message: "Database seeded successfully!",
        inserted: {
          services: servicesData.length,
          packages: newPackages.length,
          gallery: newGallery.length,
          testimonials: testimonialsData.length,
          faqs: faqsData.length,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Seeding Error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: error.message },
      { status: 500 }
    );
  }
}
