import mongoose from "mongoose";
const { Schema, model } = mongoose;

const NewsSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  date: {
    type: Date,
    required: [true, "Please add a date"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
  },
  tags: {
    type: [String],
  },
  image: {
    type: String,
  },
});

const News = mongoose.models.blogs || model("blogs", NewsSchema);

export default News;
