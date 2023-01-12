const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});


const adminIo = io.of("/admin");

adminIo.on("connection", (socket) => {
  console.log(`${socket.id} connected as admin as ${socket.username} :)`);
});

function getUserNameFromToken(_token) {
  // get user info from db
  return _token;
}

// midlleware
adminIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUserNameFromToken(socket.handshake.auth.token);
    return next(); // everything is passed successfully
  } else {
    return next(new Error("no token provided ... !"));
  }
});
