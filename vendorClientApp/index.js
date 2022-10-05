'use strict';

const { io } = require('socket.io-client');

const socket = io('http://localhost:3002');

socket.on('connect', () => {
  console.log(socket.id);
});

socket.on('disconnect', () => {
  console.log(socket.id);
});

socket.on('connect', () => {
  console.log(socket.connected); // true
});

socket.on('disconnect', () => {
  console.log(socket.connected); // false
});

// setInterval(() => {
//   console.log('vendor works', socket.id);
// }, 3000);
