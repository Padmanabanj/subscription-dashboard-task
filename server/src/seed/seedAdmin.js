import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected...");

    const exists = await User.findOne({ email: "admin@example.com" });
    if (exists) {
      console.log("⚠️ Admin already exists");
      return mongoose.connection.close();
    }

    const hashed = await bcrypt.hash("Admin123@", 10);
    await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashed,
      role: "admin",
    });

    console.log("✅ Admin user created (email: admin@example.com / pass: Admin123@)");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    mongoose.connection.close();
  }
};

seedAdmin();
