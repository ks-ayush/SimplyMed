import express from "express";
import Prescription from "../models/prescription.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {

    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const prescription = new Prescription({
      userId: req.body.userId,
      description: req.body.description,
      images: [{ url: imageUrl }],
    });

    await prescription.save();

    res.json(prescription);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;