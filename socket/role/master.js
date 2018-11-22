const Base = require("./base");
const onlineUser = require("../single/onlineUser");
const _ = require("lodash");

class Master extends Base {
  constructor() {
    super(...arguments);
    this.operationHistory = {
      actionType: "default",
      actionPayload: []
    };
  }

  getHistory() {
    return this.operationHistory;
  }

  operation(ctx) {
    const roomId = this.roomId;

    this.forEachOtherInRoom(user => user.emit("operation", ctx));

    try {
      console.log(
        roomId +
          "房间的" +
          this.userName +
          "做了" +
          ctx.actionPayload.map(item => item.type)
      );

      if (ctx.actionPayload.length > 0) {
        console.log(
          "operationHistory length",
          this.operationHistory.actionPayload.push(...ctx.actionPayload)
        );
      }
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Master;
