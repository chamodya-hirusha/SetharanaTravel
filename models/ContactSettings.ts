import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactSettings extends Document {
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
  updatedAt?: Date;
}

const ContactSettingsSchema: Schema = new Schema(
  {
    phone: { type: String, default: "" },
    secondaryPhone: { type: String, default: "" },
    email: { type: String, default: "" },
    whatsapp: { type: String, default: "" },

    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    youtube: { type: String, default: "" },
    tiktok: { type: String, default: "" },

    address: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    companyName: { type: String, default: "" },
  },
  { timestamps: true }
);

export const ContactSettingsModel: Model<IContactSettings> =
  mongoose.models.ContactSettings || mongoose.model<IContactSettings>("ContactSettings", ContactSettingsSchema);
