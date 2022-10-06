'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');

const io = new Server(PORT);

// creating namespace
const caps = io.of('/caps');
const messageQueue = new Queue();

// connect to server
io.on('connection', (socket) => {
  console.log('Socket connected to Global Event HUB!', socket.id);

});

caps.on('connection', (socket) => {
  console.log('Connected to CAPS namespace', socket.id);

  socket.on('JOIN', (room) => {
    console.log(`You have entered the ${room} room`);
  });
  
  socket.onAny((event, payload) => {
    const date = new Date();
    const time = date.toTimeString();
    console.log('EVENT', {event, time, payload});

  });

  socket.on('MESSAGE', (payload) => {
    console.log('Server MESSAGE event', payload);
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue){
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    socket.broadcast.emit('MESSAGE', payload);
  });

  socket.on('RECEIVED', (payload) => {
    console.log('Server RECEIVED event', payload);
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('no queue created');
    }

    let message = currentQueue.remove(payload.messageId);
    socket.to(payload.queueId).emit('RECEIVED', message);
  });

  socket.on('GET-MESSAGE', (payload) => {
    console.log('Got messages');
    let currentQueue = messageQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(messageId => {
        socket.emit('MESSAGE', currentQueue.read(messageId));
      });
    }
  });



  socket.on('PICKUP', (payload) => {
    // eventLogger('PICKUP', payload);
    caps.emit('PICKUP', payload);

  });

  socket.on('TRANSIT', (payload) => {
    // eventLogger('TRANSIT', payload);
    caps.emit('TRANSIT', payload);
  });

  socket.on('DELIVERY', (payload) => {
    // eventLogger('DELIVERY', payload);
    caps.emit('DELIVERY', payload);
  });

});

// function eventLogger(event, payload){
//   const date = new Date();
//   const time = date.toTimeString();
//   console.log('EVENT', {event, time, payload});
// }
