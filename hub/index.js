'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const server = new Server(PORT);


server.on('connection', (socket) => {
  console.log('Socket connected to Global Event HUB!', socket.id);



});
