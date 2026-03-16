import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import prescriptionrouter from "./routes/prescriptionrouter.js";
import insightsrouter from "./routes/insightsrouter.js";
dotenv.config();
const app = express();

connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());


app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});


app.use("/prescriptions", prescriptionrouter);
app.use("/insights", insightsrouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});