"use server";

import { revalidatePath } from "next/cache";
import connectToDatabase from "@/utils/db";
import FAQ from "@/models/FAQ";
import { FAQItem } from "@/types";

export async function getFaqs(): Promise<FAQItem[]> {
  await connectToDatabase();
  const faqs = await FAQ.find({}).sort({ createdAt: 1 }).lean();
  
  return faqs.map((f: any) => ({
    id: f._id.toString(),
    question: f.question,
    answer: f.answer,
  }));
}

export async function createFaq(formData: FormData) {
  await connectToDatabase();
  
  const newFaq = new FAQ({
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
  });

  await newFaq.save();
  revalidatePath("/");
  revalidatePath("/admin/faqs");
}

export async function updateFaq(formData: FormData) {
  await connectToDatabase();
  
  const id = formData.get("id") as string;
  const existingFaq = await FAQ.findById(id);
  if (!existingFaq) return { error: "FAQ not found" };

  existingFaq.question = formData.get("question") as string;
  existingFaq.answer = formData.get("answer") as string;

  await existingFaq.save();
  revalidatePath("/");
  revalidatePath("/admin/faqs");
}

export async function deleteFaq(id: string) {
  await connectToDatabase();
  await FAQ.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/admin/faqs");
}
