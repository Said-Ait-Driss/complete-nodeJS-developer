const io = require("socket.io-client");

const socket = io("http://localhost:3001");

socket.on("connect", async () => {
  console.log("client connected");

  // emit an event after 10s to the server (Broadcasting)
  //   for (let i = 0; i < 10; i++) {
  //     await new Promise((resolve) => setTimeout(resolve, 10000));
  //     socket.emit("send-message", `message ${i} from the client`);
  //   }

  // emit an event with a callback func
  // baisically the callback take a arg from the server
  socket.emit("run-fun", "msgs", (_response) => {
    console.log("this message from the server :", _response);
  });

  socket.on("recieve-success", (_msg) => {
    console.log("message after run func", _msg);
  });

  // recieve message from server : (it's easy we just reversing the io)
  socket.on("to-client", (server_msg) => {
    console.log("server msg : ", server_msg);
  });

  // rooms
  socket.emit("join-room", "room-1");
  // send a msg to all clients in the same room
  socket.emit("send-to-room", "msg" + Math.random, "room3");
  // listen to msg from the room
  socket.on("recievedFromRoom", (_msgFromRoom) => {
    console.log("msg from room ", _msgFromRoom);
  });
});
