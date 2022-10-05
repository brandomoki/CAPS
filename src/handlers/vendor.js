'use strict';

let eventPool = require('../eventPool.js');
const Chance = require('chance');

const chance = new Chance();

eventPool.on(' DELIVERY', confirmDelivery);

function confirmDelivery(payload) {

  setTimeout(() => {
    console.log(`--------------------------------${payload.order.orderId}` );
    eventPool.emit('DELIVERY', payload);
  }, 3000);

}

setInterval(() => {
  const order = {
    store: chance.company(),
    orderId: chance.guid({version: 4}),
    customer: chance.name(),
    address: chance.address(),
  };

  console.log('|------------------New Order Received-----------------------|');
  eventPool.emit('PICKUP', { order });
}, 5000);




// console.log(`In-Transit---------this is being received from the driver, ${payload.order.address}`);

