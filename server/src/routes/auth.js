import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Vendor from "../models/Vendor.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

// Users
router.post("/users/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, mobile, passwordHash });
    const token = createToken({ id: user._id, role: "user" });
    res.status(201).json({ token, user: { id: user._id, name, email, mobile } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = createToken({ id: user._id, role: "user" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

// Vendors
router.post("/vendors/signup", async (req, res) => {
  try {
    const { businessName, contactName, email, phone, category, city, password } = req.body;
    if (!businessName || !contactName || !email || !phone || !category || !city || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existing = await Vendor.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });
    const passwordHash = await bcrypt.hash(password, 10);
    const vendor = await Vendor.create({ businessName, contactName, email, phone, category, city, passwordHash });
    const token = createToken({ id: vendor._id, role: "vendor" });
    res.status(201).json({ token, vendor: { id: vendor._id, businessName, email, phone, category, city } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/vendors/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, vendor.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = createToken({ id: vendor._id, role: "vendor" });
    res.json({ token, vendor: { id: vendor._id, businessName: vendor.businessName, email: vendor.email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;


