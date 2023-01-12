const io = require("socket.io-client");

const adminSocket = io("http://localhost:3001/admin", {
  auth: {
    token: "saidaitdriss",
  },
});

adminSocket.on("connect", () => {
  console.log("admin connect ");
});

// in case an err accur
// for eg : in case user didn't provide credentials infos
// this will catch the  trigger server errors ( handled ones)
adminSocket.on("connect_error", (_err) => {
  console.log(_err);
});

// connect and disconnect from the socket
// adminSocket.connect();
// adminSocket.disconnect();
