const onlineUser = require("../single/onlineUser");
const Master = require("../role/master");
const Slave = require("../role/slave");
const { masterName } = require("../const");

module.exports = ({ socket, io }) => ctx => {
  //检查在线列表，如果不在里面就加入

  if (!ctx) {
    console.error("login 没有内容");
    return;
  }

  let user;
  if (!onlineUser.has(socket.id)) {
    if (isDuplicateMaster(ctx)) {
      console.log("isDuplicateMaster");
      return;
    }

    user = createUser(socket, ctx);
    onlineUser.add(user);
  } else {
    user = onlineUser.get(socket.id);
  }

  user.login();
};

const isDuplicateMaster = ctx => {
  return (
    ctx &&
    ctx.role === masterName &&
    onlineUser.getRoomMaster(ctx.roomId).length > 0
  );
};

const createUser = (socket, ctx) => {
  const params = {
    socketId: socket.id,
    id: socket.id,
    userId: ctx.userId,
    roomId: ctx.roomId,
    userName: ctx.userName,
    role: ctx.role
  };
  switch (ctx.role) {
    case masterName:
      return new Master(params);
    case "slave":
      return new Slave(params);
    default:
      console.warn("should not login without role");
      return new Slave(params);
  }
};
