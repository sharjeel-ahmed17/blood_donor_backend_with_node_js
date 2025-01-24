import express from 'express';
import { authorizeRoles , authenticateUser } from '../middlewares/authentication.js';


const router = express.Router();

// Admin route
router.get('/donor', authenticateUser, authorizeRoles('donor'), (req, res) => {
  res.json({ message: 'Welcome, donor!', user: req.user });
});



export default router;
