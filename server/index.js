const { addUser, removeUser, getUser } = require("./users.js");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.NODE_ENV === 'production' ? 80 : 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);

// gracefull shutdown
setInterval(() => server.getConnections(
  (err, connections) => console.log(`${connections} connections currently open`)
), 1000);

['SIGINT', 'SIGTERM'].forEach(signal => process.on(signal, shutDown))

let connections = [];

server.on('connection', connection => {
  connections.push(connection);
  connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
  });

  setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}
// socket connection
const io = socketio(server, {'pingInterval': 2000, 'pingTimeout': 5000});

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("signin", ({ name }, cb) => {
    const { error, user } = addUser({ id: socket.id, name });
    if (error) {
      return cb(error);
    }
    socket.emit("message", {
      user: "admin",
      text: `Welcome to the chat room ${user.name}.`
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
