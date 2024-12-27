import express from 'express';
import { createUser, login, logout, refreshToken, sendOtp } from '../controllers/auth.controller.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginSchema , createUserSchema } from '../validations/auth.validation.js';

const router = express.Router();
router.post('/register', validateRequest(createUserSchema), createUser);
router.post('/login', validateRequest(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/send-otp', sendOtp);


export default router;
