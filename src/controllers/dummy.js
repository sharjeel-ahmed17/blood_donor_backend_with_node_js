 const sendOtp = async (req, res) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 404, null, true, "User not found");
  
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.verificationToken = otp;
    await user.save();
  
    await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);
  
    sendResponse(res, 200, null, false, "OTP sent to email.");
  };
  

 const verifyEmail = async (req, res) => {
    const { token } = req.query;
  
    const user = await User.findOne({ verificationToken: token });
    if (!user) return sendResponse(res, 400, null, true, "Invalid or expired token");
  
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
  
    sendResponse(res, 200, null, false, "Email verified successfully.");
  };
  
  
  