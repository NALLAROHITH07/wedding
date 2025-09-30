import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import vendorServicesRouter from "./routes/vendorServices.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = process.env.DB_NAME || "wedding";
const PORT = process.env.PORT || 4000;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in environment");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, { dbName: DB_NAME })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });

app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use("/api", vendorServicesRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


