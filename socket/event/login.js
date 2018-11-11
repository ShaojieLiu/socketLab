const onlineUser = require("../single/onlineUser");
const Master = require("../role/master");
const Slave = require("../role/slave");

module.exports = ({
  socket,
  io
}) => ctx => {
  //检查在线列表，如果不在里面就加入
  let user;
  if (!onlineUser.has(socket.id)) {
    user = createUser(socket, ctx);
    onlineUser.add(user);
  } else {
    user = onlineUser.get(socket.id);
  }

  user.login();
};

const createUser = (socket, ctx) => {
  const params = {
    socketId: socket.id,
    id: socket.id,
    userId: ctx.userId,
    roomId: ctx.roomId,
    userName: ctx.userName,
    role: ctx.role,
  };
  switch (ctx.role) {
    case "master":
      return new Master(params);
    case "slave":
      return new Slave(params);
    default:
      console.warn('should not login without role')
      return new Slave(params);
  }
}
