import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({

  userId: String,

  description : String,
  
  images: [
    {
      url: String,
      public_id: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Insight", insightSchema);