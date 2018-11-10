const main = {};
const initIO = http => main.io = require("socket.io")(http);
main.initIO = initIO;

module.exports = main;
