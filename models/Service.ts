import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  iconName: string;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
