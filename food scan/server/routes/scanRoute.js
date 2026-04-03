import express from "express";
import Scan from "../models/scan.js";

const router = express.Router();

// POST: Save a new scan to the database
router.post("/", async (req, res) => {
  console.log("📥 Incoming POST:", req.body);
  try {
    const scan = new Scan(req.body);
    await scan.save();
    res.status(201).json(scan);
  } catch (err) {
    console.error("❌ Error saving scan:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET: Retrieve all scans sorted by timestamp
router.get("/", async (req, res) => {
  try {
    const scans = await Scan.find().sort({ timestamp: -1 });
    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;