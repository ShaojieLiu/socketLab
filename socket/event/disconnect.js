const IO = require('../single/io');
const onlineUser = require('../single/onlineUser');

module.exports = ({
  socket
}) => () => {
  //将退出的用户从在线列表中删除
  const id = socket.id;
  if (onlineUser.has(id)) {
    //退出用户的信息
    const user = onlineUser.get(id);
    //删除
    onlineUser.del(id);
    //向所有客户端广播用户退出
    IO.io.emit("logout", {
      onlineUser: onlineUser.getAll(),
      user,
    });
    console.log(user.userName + "退出了聊天室" + user.roomId);
  }
}
