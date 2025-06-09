const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("purchase", (data) => {
    console.log("شراء جديد:", data);
    socket.broadcast.emit("new-purchase", data);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
