import mongoose from "mongoose";

const vendorServiceSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true, index: true },
    type: { type: String, required: true }, // e.g., 'venues', 'photographers', etc.
    subcategory: { type: String },
    name: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String },
    price: { type: String },
    vegPrice: { type: String },
    nonVegPrice: { type: String },
    capacity: { type: String },
    rooms: { type: Number },
    rentalCost: { type: String },
    venueTypes: [{ type: String }],
    image: { type: String },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    services: { type: String },
    features: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("VendorService", vendorServiceSchema);


