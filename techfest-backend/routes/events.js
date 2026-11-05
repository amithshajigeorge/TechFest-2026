
const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Event = require("../models/Event");

const router = express.Router();

const allowedFields = [
  "name",
  "category",
  "fee",
  "seats",
  "date"
];

// Validate MongoDB ObjectId
const isValidId = (id) => mongoose.isValidObjectId(id);

// Validate event input
function validateEvent(data, isUpdate = false) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return "Invalid request body";
  }

  const keys = Object.keys(data);

  if (keys.length === 0) {
    return "Request body cannot be empty";
  }

  if (keys.some(key => !allowedFields.includes(key))) {
    return "Invalid or unsupported fields";
  }

  if (!isUpdate && allowedFields.some(key => !(key in data))) {
    return "All event fields are required";
  }

  if ("name" in data && (typeof data.name !== "string" || !data.name.trim())) {
    return "Invalid event name";
  }

  if ("category" in data && (typeof data.category !== "string" || !data.category.trim())) {
    return "Invalid event category";
  }

  if ("fee" in data && (typeof data.fee !== "number" || !Number.isFinite(data.fee) || data.fee < 0)) {
    return "Fee must be a non-negative number";
  }

  if ("seats" in data && (!Number.isInteger(data.seats) || data.seats < 0)) {
    return "Seats must be a non-negative integer";
  }

  if ("date" in data && (typeof data.date !== "string" || !data.date.trim() || Number.isNaN(Date.parse(data.date)))) {
    return "Invalid event date";
  }

  return null;
}

// GET all events
router.get("/", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    next(err);
  }
});

// GET event by ID
router.get("/:id", async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    next(err);
  }
});

// CREATE event
router.post("/", auth, async (req, res, next) => {
  try {
    const error = validateEvent(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const eventData = {
      name: req.body.name.trim(),
      category: req.body.category.trim(),
      fee: req.body.fee,
      seats: req.body.seats,
      date: req.body.date
    };

    const event = await Event.create(eventData);

    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
});

// UPDATE event
router.put("/:id", auth, async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const error = validateEvent(req.body, true);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true
      }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    next(err);
  }
});

// DELETE event
router.delete("/:id", auth, async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
