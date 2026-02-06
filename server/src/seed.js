require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const { connectDb } = require("./config/db");

const seedDatabase = async () => {
  try {
    await connectDb();
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    console.log("Cleared existing users");

    const hashedUserPass = await bcrypt.hash("user123", 10);
    const hashedAdminPass = await bcrypt.hash("admin123", 10);

    const users = [
      {
        name: "John User",
        email: "user@example.com",
        passwordHash: hashedUserPass,
        role: "user",
      },
      {
        name: "Jane User",
        email: "jane@example.com",
        passwordHash: hashedUserPass,
        role: "user",
      },
      {
        name: "Admin Officer",
        email: "admin@example.com",
        passwordHash: hashedAdminPass,
        role: "admin",
      },
      {
        name: "Super Admin",
        email: "superadmin@example.com",
        passwordHash: hashedAdminPass,
        role: "admin",
      },
    ];

    await User.insertMany(users);
    console.log("✓ Added sample users:");
    console.log("  Users:");
    console.log("    - user@example.com / user123");
    console.log("    - jane@example.com / user123");
    console.log("  Admins:");
    console.log("    - admin@example.com / admin123");
    console.log("    - superadmin@example.com / admin123");

    await mongoose.connection.close();
    console.log("✓ Database seeded successfully");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
