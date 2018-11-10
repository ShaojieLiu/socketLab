const onlineUser = require("../single/onlineUser");

module.exports = ({
  socket,
  io
}) => ctx => {
  //检查在线列表，如果不在里面就加入
  if (!onlineUser.has(socket.id)) {
    onlineUser.add({
      socketId: socket.id,
      id: socket.id,
      userId: ctx.userId,
      roomId: ctx.roomId,
      userName: ctx.userName,
    })
  }

  //向所有客户端广播用户加入
  io.emit("login", {
    onlineUser: onlineUser.getAll(),
    user: ctx
  });
  console.log(ctx.userName + "加入了聊天室" + ctx.roomId);
};
