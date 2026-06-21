import express from "express";
import axios from "axios";
import client from "../config/client.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const cachevalue=await client.get("healthcare:"+lat+":"+lng);
    if(cachevalue){
      console.log("Cache hit");
      return res.json(JSON.parse(cachevalue));
    }
    
    const response = await axios.get(
      "https://api.geoapify.com/v2/places",
      {
        params: {
          categories:
            "healthcare.hospital,healthcare.pharmacy",
          filter: `circle:${lng},${lat},5000`,
          limit: 10,
          apiKey: process.env.GEO_API_KEY,
        },
      }
    );

    await client.set("healthcare:"+lat+":"+lng,JSON.stringify(response.data.features));
    await client.expire("healthcare:"+lat+":"+lng, 3600); 
    res.json(response.data.features);
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to fetch nearby facilities",
    });
  }
});

export default router;