import cloudinary from '../config/cloudinaryConfig.js';

export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile_pictures', // Specify folder in Cloudinary
    });

    res.status(200).json({
      message: 'File uploaded successfully',
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
};
