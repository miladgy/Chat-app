const userArray = require("../Dos/allUsers")
const removeUser = id => {
    const userIndex = userArray.findIndex(p => p.id === id);
    if (userIndex > -1) {
      return userArray.splice(userIndex, 1)[0];
    }
    return false;
  };

  module.exports.removeUser = removeUser;   