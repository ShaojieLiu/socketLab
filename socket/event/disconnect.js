const IO = require('../single/io');
const onlineUser = require('../single/onlineUser');

module.exports = ({
  socket,
  io,
  user
}) => () => {
  if (user) {
    user.disconnect();
  } else {
    console.log(`该连接为无效用户, 需要登录`);
  }
}
