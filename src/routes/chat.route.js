import express from 'express';
import { sendMessage, getMessages } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/', sendMessage);
router.get('/:senderId/:receiverId', getMessages);

export default router;