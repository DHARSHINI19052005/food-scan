import mongoose from "mongoose";

const scanSchema = new mongoose.Schema({
  gas: Number,
  tds: Number,
  temp: Number,
  ph: Number,
  red: Number,
  green: Number,
  blue: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Scan", scanSchema);
