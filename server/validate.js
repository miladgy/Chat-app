const users = [];

const validate = ({ name }) => {
  name = name.trim().toLowerCase();
  const valid = /^[A-Za-z0-9._]+$/gi.test(name);
  const existingUser = users.find(p => p.name === name);
  if (existingUser) {
    return { existingUserError: "This username is already taken" };
  }
  if (!name) {
    return { existingUserError: "Please provide a username" };
  }

  if (!valid) {
    socket.emit(
      "username-error",
      `Username should contain only letters and numbers.`
    );
  } else {
    const { error, user } = addUser({ id: socket.id, name });
    socket.emit("message", {
      user: "admin",
      text: `Welcome to the chat room ${user.name} :).`
    });
  }
};

module.exports = validate;
