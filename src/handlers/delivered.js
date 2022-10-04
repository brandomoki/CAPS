'use strict';

let eventPool = require('../eventPool.js');

module.exports = (payload) => {
  setTimeout(() => {
    console.log(`################--Order has been delivered---################## ${payload.order.orderId}` );


  }, 2000);
}
