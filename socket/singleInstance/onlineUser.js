class onlineUser {
  constructor() {
    this._users = {};
  }

  _warn(message) {
    console.warn(message);
  }

  add(user) {
    !user.socketId && this._warn("socketId not found");
    this._users[user.socketId] = user;
  }

  del(socketId) {
    delete this._users[socketId];
  }

  getAll() {
    return Object.values(this._users);
  }

  get(socketId) {
    return this._users[socketId];
  }
}

module.exports = new onlineUser();
