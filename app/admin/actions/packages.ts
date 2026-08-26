"use server";

import { TravelPackage } from "@/types";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/utils/db";
import Package from "@/models/Package";
import { uploadImageToImgBB } from "@/utils/imgbb";

export async function getPackages(): Promise<TravelPackage[]> {
  await connectToDatabase();
  const packages = await Package.find({}).sort({ createdAt: -1 }).lean();
  
  // Transform _id to string for client components
  return packages.map((pkg: any) => ({
    id: pkg._id.toString(),
    title: pkg.title,
    location: pkg.location,
    duration: pkg.duration,
    price: pkg.price,
    originalPrice: pkg.originalPrice,
    image: pkg.image,
    features: pkg.features,
    isPopular: pkg.isPopular,
    category: pkg.category || "Local",
  }));
}

export async function createPackage(formData: FormData) {
  await connectToDatabase();
  
  const featuresRaw = formData.get("features") as string;
  const features = featuresRaw
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);

  let imageUrl = "";
  const imageFile = formData.get("imageFile") as File;
  if (imageFile && imageFile.size > 0) {
    const uploadedUrl = await uploadImageToImgBB(imageFile);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  const newPackage = new Package({
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    duration: formData.get("duration") as string,
    price: formData.get("price") as string,
    originalPrice: (formData.get("originalPrice") as string) || undefined,
    image: imageUrl,
    features,
    isPopular: formData.get("isPopular") === "true",
    category: (formData.get("category") as string) || "Local",
  });

  await newPackage.save();
  revalidatePath("/");
  revalidatePath("/admin/packages");
}

export async function updatePackage(formData: FormData) {
  await connectToDatabase();
  
  const id = formData.get("id") as string;
  const featuresRaw = formData.get("features") as string;
  const features = featuresRaw
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);

  const existingPackage = await Package.findById(id);
  if (!existingPackage) return { error: "Package not found" };

  let imageUrl = existingPackage.image;
  const imageFile = formData.get("imageFile") as File;
  if (imageFile && imageFile.size > 0) {
    const uploadedUrl = await uploadImageToImgBB(imageFile);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  existingPackage.title = formData.get("title") as string;
  existingPackage.location = formData.get("location") as string;
  existingPackage.duration = formData.get("duration") as string;
  existingPackage.price = formData.get("price") as string;
  existingPackage.originalPrice = (formData.get("originalPrice") as string) || undefined;
  existingPackage.image = imageUrl;
  existingPackage.features = features;
  existingPackage.isPopular = formData.get("isPopular") === "true";
  existingPackage.category = (formData.get("category") as string) || "Local";

  await existingPackage.save();
  revalidatePath("/");
  revalidatePath("/admin/packages");
}

export async function deletePackage(id: string) {
  await connectToDatabase();
  await Package.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/admin/packages");
}
