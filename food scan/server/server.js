import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import scanRoutes from "./routes/scanRoute.js"; // ✅ make sure this path is correct
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Use the router from your scanRoutes file
app.use("/api/scans", scanRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
  mongoose.connect(process.env.MONGO_URI, { dbName: "foodscan" })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

