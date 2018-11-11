const onlineUser = require("../single/onlineUser");
const Master = require("../role/master");
const Slave = require("../role/slave");

module.exports = ({
  socket
}) => () => {
  if (!onlineUser.has(socket.id)) {
    socket.emit('reLogin')
  }
};
