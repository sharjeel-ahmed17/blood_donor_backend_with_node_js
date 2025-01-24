import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Link to the User model
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Valid blood groups
    },
    lastDonationDate: {
      type: Date,
      default: null,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Donor = mongoose.model('Donor', donorSchema);

export default Donor;
