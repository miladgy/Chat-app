const io = require("./index.js").io 
const nameIsValid = require("../Validate/validateName")
const removeUser = require ("../Dos/disconnectUser")

if (nameIsValid) {
    socket.name = name;
    console.log('This is name in vaildation', socket.name)
}
socket.emit('set-name', name);
socket.join();
socket.emit('new-user-join', { user: 'admin', text: `Welcome to chat room ${user.name}.`});
// const interval = setInterval(() => {
//     if (socket.session <= 0 || isNaN(socket.session)) {
//       clearInterval(interval);
//       removeUser(socket, io, 'inactivity');
//     } else {
//       socket.session -= 1;
//     }
//   }, 1000);
// DISCONNECT FOR BEING IN ÀCTIVE