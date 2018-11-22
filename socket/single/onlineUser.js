const { masterName } = require("../const");
class onlineUser {
  constructor() {
    this._users = {};
  }

  _warn(message) {
    console.warn(message);
  }

  add(user) {
    !user.id && this._warn("id not found");
    this._users[user.id] = user;
  }

  del(socketId) {
    delete this._users[socketId];
  }

  getList() {
    return Object.values(this._users).map(user => user.getInfo());
  }

  getRoomUser(roomId) {
    return Object.values(this._users).filter(user => user.roomId === roomId);
  }

  getRoomMaster(roomId) {
    return Object.values(this._users).filter(
      user => user.roomId === roomId && user.role === masterName
    );
  }

  get(id) {
    return this._users[id];
  }

  has(id) {
    return this._users.hasOwnProperty(id);
  }
}

module.exports = new onlineUser();
