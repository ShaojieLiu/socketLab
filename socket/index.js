const _ = require("lodash");

module.exports = http => {
  var io = require("socket.io")(http);
  //在线用户
  var onlineUsers = {
    socketId: {
      socketId, // key word
      roomId,
      startTime,
      userName,
      role
    }
  };

  var onlineRooms = {};

  io.on("connection", function(socket) {
    console.log("a user connected");

    //监听新用户加入
    socket.on("login", function(obj) {
      socket.userName = obj.userName;
      socket.roomId = obj.roomId;
      socket.name = obj.userId;

      //检查在线列表，如果不在里面就加入
      if (!onlineUsers.hasOwnProperty(obj.userId)) {
        onlineUsers[obj.userId] = {
          userId: obj.userId,
          roomId: obj.roomId,
          userName: obj.userName,
          socketId: socket.id
        };
      }

      //向所有客户端广播用户加入
      io.emit("login", { onlineUsers: onlineUsers, user: obj });
      console.log(obj.userName + "加入了聊天室" + obj.roomId);
    });

    //监听用户退出
    socket.on("disconnect", function() {
      //将退出的用户从在线列表中删除
      if (onlineUsers.hasOwnProperty(socket.name)) {
        //退出用户的信息
        var user = onlineUsers[socket.name];
        var obj = {
          userId: socket.name,
          userName: user.userName,
          roomId: user.roomId
        };

        //删除
        delete onlineUsers[socket.name];

        //向所有客户端广播用户退出
        io.emit("logout", { onlineUsers: onlineUsers, user: obj });
        console.log(obj.userName + "退出了");
      }
    });

    socket.on("operation", function(obj) {
      // io.emit('operation', obj);
      const roomId = socket.roomId;
      const userInRoom = _.map(onlineUsers, (user, id) => user).filter(
        user => user.roomId === roomId
      );
      userInRoom.forEach(user => io.to(user.socketId).emit("operation", obj));

      // io.emit('operation', obj);
      console.log(
        roomId + "房间的" + socket.userName + "做了" + obj.action.type
      );
    });
  });
};
