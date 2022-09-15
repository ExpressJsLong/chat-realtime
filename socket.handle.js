import { socketEvent } from "./public/socket.event.js";

export function socketHandle(socket) {
  console.log("user connected " + socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on(socketEvent.chat.typingMessages, (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
}
