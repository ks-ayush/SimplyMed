import express from "express";

const router = express.Router();

router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;

  const query = `
    [out:json];
    (
      node["amenity"="hospital"](around:5000,${lat},${lng});
      node["amenity"="pharmacy"](around:5000,${lat},${lng});
    );
    out;
  `;

  const response = await axios.post(
    "https://overpass-api.de/api/interpreter",
    query
  );

  res.json(response.data.elements);
});

export default router;