import mongoose, { Schema, Document } from "mongoose";

export interface IFAQ extends Document {
  question: string;
  answer: string;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.FAQ || mongoose.model<IFAQ>("FAQ", FAQSchema);
