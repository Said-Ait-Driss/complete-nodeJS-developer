const http2 = require("http2");
const server = http2.createServer();

server.on("stream", (stream, headers) => {
  stream.respond({ status: 200 });
  stream.end("hello world");
});

server.listen(8000,()=>{
    console.log("server listening at 8000");
});
