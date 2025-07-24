const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});

io.on('connection', (socket) => {
    socket.on('joinRoom', (room) => {
        socket.join(room);
        socket.to(room).emit('message', `User joined room: ${room}`);
    });

    socket.on('message', ({ room, msg }) => {
        io.to(room).emit('message', msg);
    });
});

const joinRoom = (room) => {
    socket.emit('joinRoom', room);
};

const chatNamespace = io.of('/chat');

chatNamespace.on('connection', (socket) => {
    socket.on('message', (msg) => {
        chatNamespace.emit('message', msg);
    });
});

const chatSocket = io('http://localhost:5000/chat');

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});