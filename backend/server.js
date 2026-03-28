import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import prescriptionrouter from "./routes/prescriptionrouter.js";
import insightsrouter from "./routes/insightsrouter.js";
import testsrouter from "./routes/testsrouter.js";
import shareRouter from "./routes/sharerouter.js";
dotenv.config();
const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://frontend-domain.vercel.app"
    ],
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
app.use("/tests", testsrouter);
app.use("/share", shareRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});