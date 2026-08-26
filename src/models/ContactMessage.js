import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ContactMessageSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  branch: {
    type: String,
    default: "Shiya Masjid Branch",
  },
  comments: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["unread", "read", "replied"],
    default: "unread",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ContactMessage = mongoose.models.ContactMessage || model("ContactMessage", ContactMessageSchema);

export default ContactMessage;
