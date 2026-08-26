import mongoose from 'mongoose';

const NutritionConsultationSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, 'Full Name is required'],
      trim: true,
    },
    mobile_number: {
      type: String,
      required: [true, 'Mobile Number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Completed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const NutritionConsultation =
  mongoose.models.NutritionConsultation ||
  mongoose.model('NutritionConsultation', NutritionConsultationSchema);

export default NutritionConsultation;
