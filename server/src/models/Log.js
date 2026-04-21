import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    ip: {
      type: String,
      default: "0.0.0.0",
    },

    location: {
      country: String,
      city: String,
    },

    anomaly: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("Log", logSchema);

export default Log;