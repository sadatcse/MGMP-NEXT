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
      required: [true, 'Height (feet) is required'],
    },
    inch: {
      type: String,
      required: [true, 'Height (inch) is required'],
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: [true, 'Weight is required'],
    },
    age: {
      type: String,
      required: [true, 'Age is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
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
      required: true,
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
