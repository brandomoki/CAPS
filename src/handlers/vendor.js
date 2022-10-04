'use strict';

let eventPool = require('../eventPool.js');

module.exports = (payload) => {
  console.log(`In-Transit, ${payload.order}`);

}
