import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    mobile: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user"], default: "user" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);


