'use strict';

let eventPool = require('../eventPool.js');

module.exports = (payload) => {
  console.log(` Picked up order, ${payload.order.orderId}`);
  console.log(` Delivered order, ${payload.order}`);
}
