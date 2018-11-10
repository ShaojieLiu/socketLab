const _ = require("lodash");
const onlineUser = require('../single/onlineUser');

module.exports = ({
  socket,
  io,
  user
}) => ctx => {
  const roomId = user.roomId;
  const userInRoom = onlineUser.getAll().filter(
    user => user.roomId === roomId
  );
  userInRoom.forEach(user => io.to(user.id).emit("operation", ctx));

  console.log(
    roomId + "房间的" + user.userName + "做了" + ctx.action.type
  );
}
