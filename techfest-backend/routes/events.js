const express = require("express");
const auth = require("../middleware/auth");
const Event = require("../models/Event");

const router = express.Router();

// GET /api/events
router.get("/", async (req, res, next) => {
  try {
    const events = await Event.find();

    res.json(events);
  } catch (err) {
    next(err);
  }
});

// GET /api/events/:id
router.get("/:id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res
        .status(404)
        .json({ message: "Not found" });
    }

    res.json(event);
  } catch (err) {
    next(err);
  }
});

// POST /api/events
router.post("/", auth, async (req, res, next) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
});

// PUT /api/events/:id
router.put("/:id", auth, async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!event) {
      return res
        .status(404)
        .json({ message: "Not found" });
    }

    res.json(event);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/events/:id
router.delete("/:id", auth , async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(
      req.params.id
    );

    if (!event) {
      return res
        .status(404)
        .json({ message: "Not found" });
    }

    res.json({
      message: "Event deleted"
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;