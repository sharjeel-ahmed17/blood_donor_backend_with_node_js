import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['donor', 'receiver', 'admin'], required: true },
    location: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    imageUrl: { type: String },
    cnic: { type: String, required: true, unique: true },
    isAvailable: { type: Boolean, default: false },
    isVerified : {type: Boolean, default: false},
    refreshToken: { type: String },
    verificationToken: {type: String},
  },
  { timestamps: true }
);

const User =  mongoose.model('User', userSchema);

export default User;




