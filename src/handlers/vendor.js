'use strict';

let eventPool = require('../eventPool.js');

module.exports = (payload) => {
  setTimeout(() => {
    console.log(`----------------In-Transit------------------${payload.order.orderId}` );
    console.log(` Store ${payload}` );

    eventPool.emit('DELIVERED', payload)

  }, 3000);

}



// console.log(`In-Transit---------this is being received from the driver, ${payload.order.address}`);

