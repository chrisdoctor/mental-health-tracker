const http = require('http');
const { Server } = require('socket.io');
const app = require('./app'); // Importing the Express app

const PORT = process.env.PORT || 4000;

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // You can restrict this to your frontend URL if necessary
    methods: ['GET', 'POST'],
  },
});

// WebSocket connection handler
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Make io available in other files like logController.js
app.set('socketio', io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
