import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
  userId: String,
  shareId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Share", shareSchema);