"use server";

import { GalleryItem } from "@/types";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/utils/db";
import Gallery from "@/models/Gallery";
import { uploadImageToImgBB } from "@/utils/imgbb";

export async function getGallery(): Promise<GalleryItem[]> {
  await connectToDatabase();
  const items = await Gallery.find({}).sort({ createdAt: -1 }).lean();
  
  return items.map((item: any) => ({
    id: item._id.toString(),
    url: item.url,
    caption: item.caption,
    category: item.category,
  }));
}

export async function createGalleryItem(formData: FormData) {
  await connectToDatabase();
  
  let imageUrl = "";
  const imageFile = formData.get("imageFile") as File;
  if (imageFile && imageFile.size > 0) {
    const uploadedUrl = await uploadImageToImgBB(imageFile);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  const newItem = new Gallery({
    url: imageUrl,
    caption: formData.get("caption") as string,
    category: formData.get("category") as GalleryItem["category"],
  });

  await newItem.save();
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function updateGalleryItem(formData: FormData) {
  await connectToDatabase();
  
  const id = formData.get("id") as string;
  const existingItem = await Gallery.findById(id);
  if (!existingItem) return { error: "Item not found" };

  let imageUrl = existingItem.url;
  const imageFile = formData.get("imageFile") as File;
  if (imageFile && imageFile.size > 0) {
    const uploadedUrl = await uploadImageToImgBB(imageFile);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  existingItem.url = imageUrl;
  existingItem.caption = formData.get("caption") as string;
  existingItem.category = formData.get("category") as GalleryItem["category"];

  await existingItem.save();
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryItem(id: string) {
  await connectToDatabase();
  await Gallery.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}
