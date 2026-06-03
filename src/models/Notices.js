import mongoose from "mongoose";
const { Schema, model } = mongoose;

const NoticesSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  date: {
    type: Date,
    required: [true, "Please add a date"],
  },
  author: {
    type: String,
    required: [true, "Please add an author"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
  },
  image: {
    type: String,
    required: [true, "Please add an image URL"],
  },
});

const Notices = mongoose.models.notices || model("notices", NoticesSchema);

export default Notices;
