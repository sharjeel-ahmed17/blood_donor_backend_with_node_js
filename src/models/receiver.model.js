import mongoose from 'mongoose';

const receiverSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    requiredBloodGroup: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    urgencyLevel: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High'], // Indicates how urgent the blood requirement is
    },
    hospitalName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Receiver = mongoose.model('Receiver', receiverSchema);

export default Receiver;
