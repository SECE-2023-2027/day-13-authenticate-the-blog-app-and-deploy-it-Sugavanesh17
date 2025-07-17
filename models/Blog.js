import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  snippet: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
});

BlogSchema.set("toJSON", { virtuals: true });
BlogSchema.set("toObject", { virtuals: true });

export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema); 