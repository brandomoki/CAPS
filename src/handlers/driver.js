'use strict';

let eventPool = require('../eventPool.js');

module.exports = (payload) => {
  setTimeout(() => {
    console.log(`***************Picked up package************** ${payload.order.orderId}` );
    eventPool.emit('TRANSIT', payload)

  }, 3000);
}


// console.log(` Picked up order, ${payload.order.orderId}`);
// console.log(` Delivered order, ${payload.order}`);

