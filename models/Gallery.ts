import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryItem extends Document {
  url: string;
  caption: string;
  category: string;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    url: { type: String, required: true },
    caption: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryItem || mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
