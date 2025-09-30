import mongoose from "mongoose";

const vendorOrderSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    vendorServiceId: { type: mongoose.Schema.Types.ObjectId, ref: "VendorService" },
    vendorName: { type: String },
    fromName: { type: String, required: true },
    fromEmail: { type: String, required: true },
    fromPhone: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending", index: true }
  },
  { timestamps: true }
);

export default mongoose.model("VendorOrder", vendorOrderSchema);


