// server/src/seed/seedPlans.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import Plan from "../models/Plan.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedPlans = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected...");

    await Plan.deleteMany();

    await Plan.insertMany([
      {
        name: "Basic",
        price: 199,
        duration: 30,
        features: ["Access to limited content", "Email support"],
      },
      {
        name: "Pro",
        price: 499,
        duration: 90,
        features: [
          "Access to all content",
          "Priority email support",
          "Monthly webinars",
        ],
      },
      {
        name: "Enterprise",
        price: 999,
        duration: 365,
        features: [
          "Unlimited access",
          "Dedicated support",
          "Custom features",
        ],
      },
    ]);

    console.log("✅ Plans Seeded Successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding plans:", err);
    mongoose.connection.close();
  }
};

seedPlans();
