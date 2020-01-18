const io = require("./index.js").io
socket = io.connect();
const validate = (name) => {
   
      if (name.length < 6 || name.length > 12) {
        socket.emit('alert', `Your nickname should be between 6 and 12 characters long.`);
  
        return false;
      }
  
      if (/^[a-z0-9-_.]+$/gi.test(name) === false) {
        socket.emit('alert', 'Please use only letters, digits and - _ .');
        return false;
      }
      name = name.trim().toLowerCase();
      const existingUser = users.find(p => p.name === name);
      if (existingUser) {
        socket.emit('alert', 'Looks like this Nickname has already been used. Please try with a different one!');
        return false;
      }return name;
    } 
    module.exports.validate = validate;