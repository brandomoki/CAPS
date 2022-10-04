'use strict';

const eventPool = require ('./src/eventPool.js');
const driverHandler = require('./src/handlers/driver.js');
const vendorHandler = require('./src/handlers/vendor.js');
const deliveredHandler = require('./src/handlers/delivered.js');
const Chance = require('chance');

const chance = new Chance();

eventPool.on('PICKUP', driverHandler);
eventPool.on('TRANSIT', vendorHandler);
eventPool.on('DELIVERED', deliveredHandler);

setInterval(() => {
  const order = {
    store: chance.company(),
    orderId: chance.guid({version: 4}),
    customer: chance.name(),
    address: chance.address(),
  };

  console.log('--------------New Order Received-----------------------');
  eventPool.emit('PICKUP', { order });
}, 9000)
