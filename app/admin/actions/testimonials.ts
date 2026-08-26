"use server";

import { Testimonial } from "@/types";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/utils/db";
import TestimonialModel from "@/models/Testimonial";
import { uploadImageToImgBB } from "@/utils/imgbb";

export async function getTestimonials(): Promise<Testimonial[]> {
  await connectToDatabase();
  const items = await TestimonialModel.find({}).sort({ createdAt: -1 }).lean();
  
  return items.map((item: any) => ({
    id: item._id.toString(),
    name: item.name,
    location: item.location,
    image: item.image,
    rating: item.rating,
    comment: item.comment,
  }));
}

export async function createTestimonial(formData: FormData) {
  await connectToDatabase();
  
  let imageUrl = "";
  const imageFile = formData.get("imageFile") as File;
  if (imageFile && imageFile.size > 0) {
    const uploadedUrl = await uploadImageToImgBB(imageFile);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  const newItem = new TestimonialModel({
    name: formData.get("name") as string,
    location: formData.get("location") as string,
    image: imageUrl,
    rating: Number(formData.get("rating")) || 5,
    comment: formData.get("comment") as string,
  });

  await newItem.save();
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function updateTestimonial(formData: FormData) {
  await connectToDatabase();
  
  const id = formData.get("id") as string;
  const existingItem = await TestimonialModel.findById(id);
  if (!existingItem) return { error: "Testimonial not found" };

  let imageUrl = existingItem.image;
  const imageFile = formData.get("imageFile") as File;
  if (imageFile && imageFile.size > 0) {
    const uploadedUrl = await uploadImageToImgBB(imageFile);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  existingItem.name = formData.get("name") as string;
  existingItem.location = formData.get("location") as string;
  existingItem.image = imageUrl;
  existingItem.rating = Number(formData.get("rating")) || 5;
  existingItem.comment = formData.get("comment") as string;

  await existingItem.save();
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await connectToDatabase();
  await TestimonialModel.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
