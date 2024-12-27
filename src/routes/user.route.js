import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { uploadProfilePicture } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/upload', upload.single('profilePicture'), uploadProfilePicture);

export default router;
