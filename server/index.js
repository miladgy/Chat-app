const { addUser, removeUser, getUser } = require("./users.js");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const logger = require("../server/services/logger")
const PORT = process.env.NODE_ENV === "production" ? 80 : 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
app.use(router);
let timer = {};
let timeoutSeconds = 10;
/*
  Gracefull shutdown
*/

setInterval(
  () =>
    server.getConnections((err, connections) =>
      console.log(`${connections} connections currently open`)
    ),
  3000
);

["SIGINT", "SIGTERM"].forEach(signal => process.on(signal, shutDown));

let connections = [];

server.on("connection", connection => {
  connections.push(connection);
  connection.on(
    "close",
    () => (connections = connections.filter(curr => curr !== connection))
  );
});

function shutDown() {
  console.log("Received kill signal, shutting down gracefully");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);

  // connections.forEach(curr => curr.end());
  // setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}
/*
  socket connection
*/

const io = socketio(server, { pingInterval: 2000, pingTimeout: 5000 });

io.on("connection", socket => {
  console.log("a user connected");
  logger.info(`${socket.id} is connected`);

  socket.on("signin", ({ name }, cb) => {
    const { error, user } = addUser({ id: socket.id, name });
    if (error) {
      logger.info(
        `${socket.id} is already taken!`
      );
      return cb(error);
    } else {
      /* istanbul ignore next */
    //  logger.info(
    //   `username - ${user.name} joined chat`
    // );
    socket.emit("message", {
      user: "admin",
      text: `Welcome to the chat room ${user.name} :).`
    });
   
    socket.broadcast.emit("message", {
      user: "admin",
      text: `${user.name} has joined our chat.`
    });
     
    }

  });

  
  socket.on("sendMessage", (message, cb) => {
    const user = getUser(socket.id);
    io.emit("message", { user: user.name, text: message });
    const handleActivity = user => {
      const inactiveMessage = {
        user: "admin",
        text: `${user.name} logged off due to inactivity!`
      };
      logger.info(
        `${user.name} logged off due to inactivity`
      );
      io.emit("message", inactiveMessage);
      socket.disconnect(user.id);
    };
    if ( timer ) {
      clearTimeout(timer);
    }
    timer = setTimeout(handleActivity, 2000 * timeoutSeconds, user);

    cb();

  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    logger.info(
      `${socket.id} disconnected from chat.`
    );
    const user = removeUser(socket.id);
    if (user) {
      io.emit("message", {
        user: "admin",
        text: `${user.name} has left the chat`
      });
      io.emit("disconnect", {
        user: "admin",
        text: `${user.name} has left the chat`
      });
    }
  });
});


server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
