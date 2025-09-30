import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    contactName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true },
    category: { type: String, required: true },
    city: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["vendor"], default: "vendor" }
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);


