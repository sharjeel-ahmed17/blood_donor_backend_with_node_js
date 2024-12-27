import Chat from '../models/chat.model.js';

// Add a new message
export const sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const newMessage = await Chat.create({ senderId, receiverId, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get messages between two users
export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
