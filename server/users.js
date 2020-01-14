const users = [];

const addUser = ({ id, name }) => {
  name = name.trim().toLowerCase();
  const existingUser = users.find(p => p.name === name);
  if (existingUser) {
    return { error: "This username is already taken" };
  }
  const user = { id, name };
  users.push(user);
  return { user };
};

const removeUser = () => {
    const userIndex = users.findIndex(p => p.id === id)
    if (userIndex > -1){
       return users.splice(userIndex, 1)[0];
    }
};
const getUser = (id) => users.find((p) => p.id === id);

module.exports = {addUser, removeUser, getUser};