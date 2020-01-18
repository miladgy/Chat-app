const io = require("./index.js").io 

const getAllUsers = () => {
   return Object.keys(io.sockets.sockets).map(id => io.sockets.sockets[id].name).filter(p => p.name)
}

module.exports.getAllUsers = getAllUsers;