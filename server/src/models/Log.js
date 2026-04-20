import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },

    // 🔥 MUST MATCH CONTROLLER
    level: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Log", logSchema);