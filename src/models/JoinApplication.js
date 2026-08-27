import mongoose from 'mongoose';

const JoinApplicationSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, 'Full Name is required'],
      trim: true,
    },
    feet: {
      type: String,
      default: '',
    },
    inch: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    weight: {
      type: String,
      default: '',
    },
    age: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    telephone_number: {
      type: String,
      required: [true, 'Mobile Number is required'],
    },
    package_name: {
      type: String,
      required: [true, 'Package selection is required'],
    },
    package_price: {
      type: String,
      default: '',
    },
    package_note: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const JoinApplication =
  mongoose.models.JoinApplication ||
  mongoose.model('JoinApplication', JoinApplicationSchema);

export default JoinApplication;
