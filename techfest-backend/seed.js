require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("./models/Event");

const initialEvents = [
  {
    name: "24-Hour Hackathon 2026",
    category: "Technical",
    fee: 100,
    seats: 50,
    date: "2026-03-25"
  },
  {
    name: "Web Dev & Cloud Workshop",
    category: "Workshop",
    fee: 250,
    seats: 60,
    date: "2026-03-26"
  },
  {
    name: "Robotics Sumo Challenge",
    category: "Technical",
    fee: 300,
    seats: 30,
    date: "2026-03-26"
  },
  {
    name: "TechFest Cultural Night",
    category: "Cultural",
    fee: 0,
    seats: 250,
    date: "2026-03-27"
  },
  {
    name: "Inter-College E-Sports Arena",
    category: "Sports",
    fee: 150,
    seats: 80,
    date: "2026-03-27"
  }
];

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      console.error("Error: MONGO_URI is not defined in environment.");
      process.exit(1);
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    const count = await Event.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} events. Skipping seed.`);
    } else {
      await Event.insertMany(initialEvents);
      console.log(`Successfully seeded ${initialEvents.length} events!`);
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
