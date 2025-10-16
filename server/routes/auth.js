import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const app = express.Router();

//สร้าง  jwt token
const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "1h" }
  );

// POST /api/auth/register
app.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, membership, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "fullName, email, password required" });
    }
    const existed = await User.findOne({ email });
    if (existed) return res.status(409).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      phone,
      membership,
      passwordHash,
    });

    // จะส่ง token กลับเลย หรือจะให้แค่ข้อความก็ได้
    const token = signToken(user);
    return res.status(201).json({
      message: "Registered successfully",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (err) {
    // E11000 duplicate key (กันไว้เผื่อ unique index ยิงชน)
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email, password required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email or password incorrect" });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: "Email or password incorrect" });
    const token = signToken(user);
    return res.json({
      message: "Login success",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/logout
app.post("/logout", (req, res) => {
  return res.json({ message: "Logout success" });
});

export default app;
