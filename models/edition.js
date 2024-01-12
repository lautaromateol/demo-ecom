import mongoose from "mongoose";

const editionSchema = new mongoose.Schema({
    console: { type: String, required: true },
  });

export default mongoose.models.Edition || mongoose.model("Edition", editionSchema)