import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import chatRoutes from './src/routes/chat.route.js';
import userRoutes from './src/routes/user.route.js';
// import testRoutes from './src/routes/test.route.js';
import donorRoutes from './src/routes/donor.route.js';

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
app.use('/api/donor', donorRoutes);
app.use('/api/chat', chatRoutes);
// cloudanary testing
app.use('/api/users', userRoutes);
// app.use('/api/test', testRoutes);
// app.use('/api/users', userRoutes)



export default app;