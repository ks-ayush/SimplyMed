import Prescription from "../models/prescription.js";
import Insight from "../models/insights.js";
import Test from "../models/tests.js";
import express from "express";
import { nanoid } from "nanoid";
import Share from "../models/share.js";


const router=express.Router();

router.post("/create",async(req,res)=>{
  try {
    const {userId}=req.body;

    const shareId="rx_" + nanoid(8);

    const share = new Share({
      userId,
      shareId
    });

    await share.save();

    res.json({
      link: `http://localhost:3000/share/${shareId}`
    });

  } catch (err) {
    res.status(500).json({ message: "Error creating share link" });
  }
});

router.get("/:shareId",async(req,res)=>{
  try {
    const share = await Share.findOne({ shareId: req.params.shareId });

    if (!share) {
      return res.status(404).json({ message: "Invalid link" });
    }

    const userId = share.userId;

    const prescriptions = await Prescription.find({ userId });
    const insights = await Insight.find({ userId });
    const tests = await Test.find({ userId });

    res.json({
      prescriptions,
      insights,
      tests
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching shared data" });
  }
});

export default router;