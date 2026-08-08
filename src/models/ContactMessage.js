import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ContactMessageSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
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
    required: [true, "Message is required"],
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
