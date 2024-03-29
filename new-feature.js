require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// const PORT = process.env.PORT || 3001;
const PORT = 10000;
// const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const CLIENT_URL = "https://cheerful-douhua-a16b54.netlify.app";

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log({ data });
    socket.to(data.room).emit("receive_message", data); some problems
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
stash 3

server.listen(PORT, () => {
  console.log(`SERVER RUNNING on port ${PORT}`);
});

stash 2

Adding new features

Adding stash edit

stash1