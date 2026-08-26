import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  location: string;
  image?: string;
  rating: number;
  comment: string;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: false },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
