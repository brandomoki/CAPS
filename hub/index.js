'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

const io = new Server(PORT);

// creating namespace
const caps = io.of('/caps');

// connect to server
io.on('connection', (socket) => {
  console.log('Socket connected to Global Event HUB!', socket.id);


});

caps.on('connection', (socket) => {
  console.log('Connected to CAPS namespace', socket.id);

  socket.on('JOIN', (room) => {
    console.log(`You have entered the ${room} room`);
  });

  socket.on('PICKUP', (payload) => {
    console.log(Hub)
  })

});

function eventLogger(event, payload){
  const date = new Date();
  const time = date.toTimeString();
  console.log('EVENT', {event, time, payload});
}
