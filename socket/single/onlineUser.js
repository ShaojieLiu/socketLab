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

  getAll() {
    return Object.values(this._users);
  }

  get(id) {
    return this._users[id];
  }

  has(id) {
    return this._users.hasOwnProperty(id);
  }
}

module.exports = new onlineUser();
