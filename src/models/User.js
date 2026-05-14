import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a Name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [/.+@.+\..+/, "Please add a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 8,
    maxlength: 128,
  },
});

const User = mongoose.models.User || model("User", UserSchema);

export default User;
