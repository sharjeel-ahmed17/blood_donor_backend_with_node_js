import "dotenv/config";
import app from "./app.js";
import http from 'http';
import { Server } from 'socket.io';
import path from "path";
const port  = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('new message', (data) => {
    socket.broadcast.emit('new message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Cleanup tasks
  server.close(() => {
    console.log('Closed remaining connections gracefully.');
    process.exit(1); // Exit process
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});