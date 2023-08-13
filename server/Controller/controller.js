const users = [];

const addUser = ({id, name, room}) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);
  if (existingUser) {
    return {"error": "Some error occured!"};
  }

  const user = {id, name, room};
  users.push(user);
  console.log(users);
  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice()[0];
  }
}

const getUser = (id) => {
   const user = users.find((user) => user.id === id);
   return { user };
}

const getUsersinRoom = (room) => {
    const roomusers = users.find((user) => user.room === room);
    return { roomusers };
}

module.exports = {addUser, removeUser, getUser, getUsersinRoom};