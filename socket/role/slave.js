const Base = require("./base");
const onlineUser = require('../single/onlineUser');
const _ = require("lodash");

class Slave extends Base {
  constructor() {
    super(...arguments);
  }

  operation(ctx) {
    console.warn('slave cant emit operation');
  }
}

module.exports = Slave;
