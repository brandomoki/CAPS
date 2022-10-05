'use strict';

let eventPool = require('../eventPool.js');

eventPool.on(' PICKUP', driverHandler);

function driverHandler(payload) {
  setTimeout(() => {
    console.log(`***************Picked up package--In-Transit************** ${payload.order.orderId}` );
    eventPool.emit('TRANSIT', payload);

  }, 3000);

  setTimeout(() => {
    console.log(`***************Picked up package************** ${payload.order.orderId}` );
    eventPool.emit('DELIVERY', payload);

  }, 3500);

}

module.exports = driverHandler;


// console.log(` Picked up order, ${payload.order.orderId}`);
// console.log(` Delivered order, ${payload.order}`);

