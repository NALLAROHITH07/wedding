import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import User from "../models/User.js";

const router = Router();

router.get("/users/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json({ user });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/users/me", requireAuth, async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, mobile },
      { new: true, runValidators: true }
    ).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json({ user });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;


