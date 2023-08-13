const {addUser, removeUser, getUser, getUsersinRoom} = require("./Controller/controller");
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log('A client connected');

    socket.on('join', ({ name, room }, callback) => {
       const {error, user} = addUser({id: socket.id, name, room});
       if (error) return callback(error);

       socket.emit('message', {user: 'admin', text: `${user.name}, Welcome to the Room ${user.room}`});
       socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has Joined!`});  
       
       socket.join(user.room);

       callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message});

        callback();
    });

    socket.on('disconnect', () => {
        console.log('User had Left!!');
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
