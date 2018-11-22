const _ = require("lodash");

const connection = require("./connection");
const login = require("./login");
const disconnect = require("./disconnect");
const operation = require("./operation");
const broadcast = require("./broadcast");

const onlineUser = require("../single/onlineUser");
const IO = require("../single/io");

const method = {
  connection,
  login,
  disconnect,
  operation,
  broadcast
};

const wraped = {};

_.forEach(method, (func, key) => {
  wraped[key] = socket => ctx => {
    const user = onlineUser.get(socket.id);
    return func({
      socket,
      io: IO.io,
      user
    })(ctx);
  };
});

module.exports = wraped;
