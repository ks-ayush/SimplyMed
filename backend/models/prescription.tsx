import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({

  userId: String,
  
  images: [
    {
      url: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Prescription", prescriptionSchema);