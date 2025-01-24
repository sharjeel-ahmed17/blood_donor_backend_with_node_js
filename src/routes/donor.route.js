import express from 'express';
import {  authenticateUser } from '../middlewares/authentication.js';


const router = express.Router();

// Admin route
router.get('/get', authenticateUser, (req, res) => {
  res.json({ message: 'Welcome, donor!'});
});



export default router;
