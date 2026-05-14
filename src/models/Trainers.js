import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TrainersSchema = new Schema({
  full_name: {
    type: String,
    required: [true, "Please add the full name"],
  },
  short_name: {
    type: String,
  },
  image_url: {
    type: String,
  },
  bio: {
    type: String,
  },
  certification: {
    type: String,
  },
  email: {
    type: String,
  },
  Instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  mobile: {
    type: String,
  },
  role: {
    type: String,
  },
  position_title: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Trainers = mongoose.models.Teams || model("Teams", TrainersSchema);

export default Trainers;
