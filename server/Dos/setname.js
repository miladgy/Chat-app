module.exports = (socket, io) => {
    console.log("in set name")
    socket.on('set nickname', name => console.log(name)); 
}