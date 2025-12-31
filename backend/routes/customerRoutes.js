const express = require("express");
const Customer = require("../models/Customer");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* ================= CREATE ================= */
router.post("/", auth, async (req, res) => {
  try {
    const customer = await Customer.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: "Customer creation failed" });
  }
});

/* ================= READ ================= */
router.get("/", auth, async (req, res) => {
  try {
    const customers = await Customer.find({
      createdBy: req.user.id
    }).sort({ createdAt: -1 });

    res.json(customers);
  } catch {
    res.status(500).json({ message: "Failed to fetch customers" });
  }
});

/* ================= UPDATE ================= */
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Customer.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", auth, async (req, res) => {
  try {
    await Customer.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    res.json({ message: "Customer deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
