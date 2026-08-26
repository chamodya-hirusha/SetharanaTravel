import mongoose, { Schema, Document } from "mongoose";

export interface IPackage extends Document {
  title: string;
  location: string;
  duration: string;
  price: string;
  originalPrice?: string;
  image: string;
  features: string[];
  isPopular: boolean;
  category: "Local" | "Foreign" | "Both";
}

const PackageSchema = new Schema<IPackage>(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    originalPrice: { type: String, required: false },
    image: { type: String, required: true },
    features: [{ type: String }],
    isPopular: { type: Boolean, default: false },
    category: { type: String, enum: ['Local', 'Foreign', 'Both'], default: 'Local', required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Package || mongoose.model<IPackage>("Package", PackageSchema);
