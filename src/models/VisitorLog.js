import mongoose from "mongoose";
const { Schema, model } = mongoose;

const VisitorLogSchema = new Schema({
  ip: {
    type: String,
    default: "Unknown",
  },
  country: {
    type: String,
    default: "Unknown",
  },
  referrer: {
    type: String,
    default: "",
  },
  source: {
    type: String,
    enum: ["Direct", "Search Engine", "Referral"],
    default: "Direct",
  },
  sourceName: {
    type: String,
    default: "Direct",
  },
  path: {
    type: String,
    default: "/",
  },
  userAgent: {
    type: String,
    default: "Unknown",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VisitorLog = mongoose.models.VisitorLog || model("VisitorLog", VisitorLogSchema);

export default VisitorLog;
