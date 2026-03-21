import express from "express";
import Test from "../models/tests.js";
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
          { folder: "tests" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await streamUpload();

    const test = new Test({
      userId: req.body.userId,
      description: req.body.description,
      images: [
        {
          url: result.secure_url,
          public_id: result.public_id   
        }
      ],
    });

    await test.save();

    res.json(test);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed" });
  }
});


router.get("/user/:userId", async (req, res) => {
  try {
    const tests = await Test.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(tests);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching tests" });
  }
});


router.delete("/:id", async (req, res) => {
  try {

    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }


    for (const img of test.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await Test.findByIdAndDelete(req.params.id);

    res.json({ message: "Tests deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;