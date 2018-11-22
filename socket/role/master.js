const Base = require("./base");
const onlineUser = require("../single/onlineUser");
const _ = require("lodash");

class Master extends Base {
  constructor() {
    super(...arguments);
  }

  operation(ctx) {
    const roomId = this.roomId;

    this.forEachOtherInRoom(user => user.emit("operation", ctx));

    console.log(
      roomId +
        "房间的" +
        this.userName +
        "做了" +
        ctx.actionPayload.map(item => item.type)
    );
  }
}

module.exports = Master;
