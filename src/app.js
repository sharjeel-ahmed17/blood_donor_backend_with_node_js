import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.route.js';
import userRoutes from './routes/user.route.js';
// import userRoutes from './routes/user.routes.js';
const app = express();

// middleware 
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors("*"));
app.use(cookieParser());

// connect to MongoDB
connectDB();
//  routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
// cloudanary testing
app.use('/api/users', userRoutes);
// app.use('/api/users', userRoutes)



export default app;