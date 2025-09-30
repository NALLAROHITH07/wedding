import { Router } from "express";
import { requireAuth, requireVendor } from "../middleware/auth.js";
import VendorService from "../models/VendorService.js";
import VendorOrder from "../models/VendorOrder.js";

const router = Router();

// Create service (vendor only)
router.post("/vendor-services", requireVendor, async (req, res) => {
  try {
    const { type, subcategory, name, city, location, price, vegPrice, nonVegPrice, capacity, rooms, rentalCost, venueTypes, image, services, features } = req.body;
    if (!type || !name || !city) return res.status(400).json({ message: "Missing required fields" });
    const doc = await VendorService.create({
      vendorId: req.user.id,
      type,
      subcategory,
      name,
      city,
      location,
      price,
      vegPrice,
      nonVegPrice,
      capacity,
      rooms,
      rentalCost,
      venueTypes,
      image,
      services,
      features,
    });
    res.status(201).json({ service: doc });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// List services with optional filters
router.get("/vendor-services", async (req, res) => {
  try {
    const { type, city } = req.query;
    const query = {};
    if (type) query.type = type;
    if (city) query.city = city;
    const services = await VendorService.find(query).sort({ createdAt: -1 });
    res.json({ services });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single service
router.get("/vendor-services/:id", async (req, res) => {
  try {
    const svc = await VendorService.findById(req.params.id);
    if (!svc) return res.status(404).json({ message: "Not found" });
    res.json({ service: svc });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create order for a vendor service
router.post("/vendor-services/:id/orders", async (req, res) => {
  try {
    const svc = await VendorService.findById(req.params.id);
    if (!svc) return res.status(404).json({ message: "Service not found" });
    const { fromName, fromEmail, fromPhone, message } = req.body;
    if (!fromName || !fromEmail || !fromPhone || !message) return res.status(400).json({ message: "Missing fields" });
    const order = await VendorOrder.create({
      vendorId: svc.vendorId,
      vendorServiceId: svc._id,
      vendorName: svc.name,
      fromName, fromEmail, fromPhone, message,
    });
    res.status(201).json({ order });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Vendor list orders by status
router.get("/vendor-orders", requireAuth, async (req, res) => {
  try {
    const { status } = req.query;
    const q = { vendorId: req.user.id };
    if (status) q.status = status;
    const orders = await VendorOrder.find(q).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Vendor update order status
router.put("/vendor-orders/:id", requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['accepted','rejected','pending'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const order = await VendorOrder.findOneAndUpdate({ _id: req.params.id, vendorId: req.user.id }, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json({ order });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// My services (vendor only)
router.get("/vendor-services/mine", requireVendor, async (req, res) => {
  try {
    const services = await VendorService.find({ vendorId: req.user.id }).sort({ createdAt: -1 });
    res.json({ services });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a service (owner only)
router.put("/vendor-services/:id", requireVendor, async (req, res) => {
  try {
    const allowed = [
      "type","subcategory","name","city","location","price","vegPrice","nonVegPrice","capacity","rooms","rentalCost","venueTypes","image","services","features"
    ];
    const update = {};
    for (const k of allowed) if (k in req.body) update[k] = req.body[k];
    const doc = await VendorService.findOneAndUpdate(
      { _id: req.params.id, vendorId: req.user.id },
      update,
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ service: doc });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a service (owner only)
router.delete("/vendor-services/:id", requireVendor, async (req, res) => {
  try {
    const result = await VendorService.deleteOne({ _id: req.params.id, vendorId: req.user.id });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;


