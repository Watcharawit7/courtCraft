import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    role: { type: String, enum: ["member", "admin"], default: "member" },
    membership: { type: String, enum: ["regular", "student", "vip"], default: "regular" },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
