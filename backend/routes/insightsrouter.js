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


router.get("/user/:userId", async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(prescriptions);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching prescriptions" });
  }
});

router.delete("/:id", async (req, res) => {
  try {

    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    await Prescription.findByIdAndDelete(req.params.id);

    res.json({ message: "Prescription deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;