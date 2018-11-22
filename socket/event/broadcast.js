const _ = require("lodash");

module.exports = ({ socket, io, user }) => ctx => {
  if (user) {
    user.broadcast(ctx);
  } else {
    console.log(`broadcast, 该连接为无效用户, 需要登录`);
    // socket.emit("reLogin");
  }
};
