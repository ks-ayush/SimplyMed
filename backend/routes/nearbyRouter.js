import express from "express";
import axios from "axios";
import client from "../config/client.js";
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { lat, lng, query } = req.query;
    const cachevalue = await client.get("search:" + lat + ":" + lng + ":" + query);
    if (cachevalue) {
      console.log("Cache hit");
      return res.json(JSON.parse(cachevalue));
    }
    const searchresponse = await axios.get(
      "https://api.geoapify.com/v1/geocode/search",
      {
        params: {
          text: query,
          bias: `proximity:${lng},${lat}`,
          limit: 5,
          apiKey: process.env.GEO_API_KEY,
        },
      }
    );
    await client.set("search:" + lat + ":" + lng + ":" + query, JSON.stringify(searchresponse.data.features));
    await client.expire("search:" + lat + ":" + lng + ":" + query, 1800);
    res.json(searchresponse.data.features);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to fetch search results",
    });
  }
})

router.get("/", async (req, res) => {
  try {
    const { lat, lng, category } = req.query;
    const selectedCategory = category || "healthcare.hospital,healthcare.pharmacy";
    const cachevalue = await client.get("healthcare:" + lat + ":" + lng + ":" + selectedCategory);
    if (cachevalue) {
      console.log("Cache hit");
      return res.json(JSON.parse(cachevalue));
    }

    const response = await axios.get(
      "https://api.geoapify.com/v2/places",
      {
        params: {
          categories: selectedCategory,
          filter: `circle:${lng},${lat},5000`,
          limit: 10,
          apiKey: process.env.GEO_API_KEY,
        },
      }
    );


    await client.set("healthcare:" + lat + ":" + lng + ":" + selectedCategory, JSON.stringify(response.data.features));
    await client.expire("healthcare:" + lat + ":" + lng + ":" + selectedCategory, 3600);
    res.json(response.data.features);
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to fetch nearby facilities",
    });
  }
});

export default router;