import connectToDatabase from "@/utils/db";
import { ContactSettingsModel } from "@/models/ContactSettings";

export type ContactSettings = {
  phone: string;
  secondaryPhone: string;
  email: string;
  whatsapp: string;

  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  tiktok: string;

  address?: string;
  city?: string;
  country?: string;
  companyName?: string;
};

export async function getContactSettings(): Promise<ContactSettings | null> {
  try {
    await connectToDatabase();
    const settings = await ContactSettingsModel.findOne({}).lean();
    if (!settings) {
      return null;
    }
    
    // Remove _id and __v for clean object returning
    const { _id, __v, createdAt, updatedAt, ...cleanSettings } = settings as any;
    return cleanSettings as ContactSettings;
  } catch (error) {
    console.error("Error reading contact settings from DB:", error);
    return null;
  }
}
