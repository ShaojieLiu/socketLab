const _ = require("lodash");
const onlineUser = require("../single/onlineUser");

module.exports = ({ socket, io, user }) => ctx => {
  if (user) {
    user.operation(ctx);
  } else {
    console.log(`operation, 该连接为无效用户, 需要登录`);
    // socket.emit("reLogin");
  }
};
