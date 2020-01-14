const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { addUser, removeUser, getUser } = require("./users.js");

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("signin", ({ name }, cb) => {
    const { error, user } = addUser({ id: socket.id, name });
    if (error) {
      return cb(error);
    }
    socket.emit("message", {
      user: "admin",
      welcomeText: `Welcome to the chat room ${user.name}.`
    });
    socket.broadcast.emit("message", {
      user: "admin",
      text: `${user.name} has joined our chat.`
    });
    cb();
  });
  socket.on('sendMessage', (message, cb) => {
    const user = getUser(socket.id)
    io.emit('message', {user: user.name, text: message})
    cb();
  })
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.use(router);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
