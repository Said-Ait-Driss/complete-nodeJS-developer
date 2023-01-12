const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected ...!", socket.id);

  socket.on("send-message", (_message) => {
    console.log(`${socket.id} sent a message : ${_message}`);
  });

  // responding to callback (from sender to reciever )
  socket.on("run-fun", (_arg, callback) => {
    console.log("arg from client", _arg);
    callback("hello back from server !");

    // emit msg to all client except who sent the msg
    socket.broadcast.emit("recieve-success", "your msg resived");
  });

  // rooms
  socket.on("join-room", (room) => {
    console.log(socket.id, " joined room");
    socket.join(room);
  });

  socket.on("send-to-room", (msg, room) => {
    socket.join(room);
    socket.to(room).emit("recievedFromRoom", msg);
  });
});

// emit from server to all clients this time :)
io.emit("to-client", "message from server");

/*
 * - io emitting events
 * - socket listen to events
 * 
 * rooms are useful to do a group chat 
 * - each user has his own room : which is socket.id
 * 
 * namespaces : (the main idea is like to create multiple io instance)
 *  in server :
 *    const ioUsers = io.of("/users")
 *  in clients :
 *    const usersSocket = io("http://localhost:3001/users")
 * 
 * the namespaces are usefull when it's comes to add for example a middleware to admin socket (seperate admin socket with users socket)
 */
