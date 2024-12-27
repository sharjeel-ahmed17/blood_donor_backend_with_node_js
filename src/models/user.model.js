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



// // Pre-save hook to hash the password before saving it to the database
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();

//   // Hash the password before saving
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);

//   next();
// });

// // Method to compare hashed password during login
// userSchema.methods.comparePassword = function(password) {
//   return bcrypt.compare(password, this.password);
// };

const User =  mongoose.model('User', userSchema);

export default User;




