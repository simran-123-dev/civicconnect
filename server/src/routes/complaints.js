const express = require("express");
const Complaint = require("../models/Complaint");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

const pick = (source, fields) => {
  return fields.reduce((acc, field) => {
    if (source[field] !== undefined) {
      acc[field] = source[field];
    }
    return acc;
  }, {});
};

router.get("/", auth, async (req, res) => {
  try {
    let filter;
    if (req.user.role === "admin") {
      // Admins see complaints from their assigned town only
      filter = { town: req.user.town };
    } else {
      // Citizens see only their own complaints
      filter = { createdBy: req.user.id };
    }
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    return res.json(complaints);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Not found" });
    }

    if (req.user.role !== "admin" && String(complaint.createdBy) !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.json(complaint);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const data = pick(req.body, [
      "title",
      "description",
      "locationText",
      "town",
      "coords",
      "category",
    ]);

    if (!data.title || !data.description || !data.locationText || !data.town) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const complaint = await Complaint.create({
      ...data,
      createdBy: req.user.id,
    });

    return res.status(201).json(complaint);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Not found" });
    }

    const isOwner = String(complaint.createdBy) === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const allowedUserFields = [
      "title",
      "description",
      "locationText",
      "coords",
      "category",
    ];
    const allowedAdminFields = ["status", "remarks", "proofName"];

    const updates = isAdmin
      ? { ...pick(req.body, allowedUserFields), ...pick(req.body, allowedAdminFields) }
      : pick(req.body, allowedUserFields);

    Object.assign(complaint, updates);
    await complaint.save();

    return res.json(complaint);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, requireRole("admin"), async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
