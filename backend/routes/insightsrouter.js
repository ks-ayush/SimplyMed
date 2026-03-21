import express from "express";
import Insight from "../models/insights.js";
import { upload } from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();


router.post("/upload", upload.single("image"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }


    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "insights" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await streamUpload();

    const insight = new Insight({
      userId: req.body.userId,
      description: req.body.description,
      images: [
        {
          url: result.secure_url,
          public_id: result.public_id   
        }
      ],
    });

    await insight.save();

    res.json(insight);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed" });
  }
});


router.get("/user/:userId", async (req, res) => {
  try {
    const insights = await Insight.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(insights);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching insights" });
  }
});

router.delete("/:id", async (req, res) => {
  try {

    const insight = await Insight.findById(req.params.id);

    if (!insight) {
      return res.status(404).json({ message: "Insight not found" });
    }

    for (const img of insight.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await Insight.findByIdAndDelete(req.params.id);

    res.json({ message: "Insight deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;