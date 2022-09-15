import { socketEvent } from "../public/socket.event.js";
import { getGroupMembers, insertMessages } from "./route.js";

export function socketHandle(io) {
  io.on("connection", (socket) => {
    // console.log(socket);
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on(socketEvent.account.login, (userId) => {
      console.log("connected userId: " + userId);
      socket.join(userId);
    });

    socket.on(socketEvent.chat.typingStart, (payload) => {
      console.log(`typing start payload: ${JSON.stringify(payload)}`);
      io.to(payload.to).emit(socketEvent.chat.typingStart, payload);

      // send to user
      if (payload.target == "USER") {
        io.to(payload.to).emit(socketEvent.chat.typingStart, payload);
      } else {
        getGroupMembers(payload.to).forEach((item) => {
          console.log(item);
          io.to(String(item.userId)).emit(
            socketEvent.chat.typingStart,
            payload
          );
        });
      }
    });

    socket.on(socketEvent.chat.typingEnd, (payload) => {
      console.log(`typing end payload: ${JSON.stringify(payload)}`);
      io.to(payload.to).emit(socketEvent.chat.typingEnd, payload);

      // send to user
      if (payload.target == "USER") {
        io.to(payload.to).emit(socketEvent.chat.typingEnd, payload);
      } else {
        getGroupMembers(payload.to).forEach((item) => {
          console.log(item);
          io.to(String(item.userId)).emit(socketEvent.chat.typingEnd, payload);
        });
      }
    });

    socket.on(socketEvent.chat.sendMessages, (payload) => {
      console.log(`messages payload: ${JSON.stringify(payload)}`);
      insertMessages(payload);

      // send to user
      if (payload.target == "USER") {
        io.to(payload.to).emit(socketEvent.chat.receiveMessages, payload);
      } else {
        getGroupMembers(payload.to).forEach((item) => {
          console.log(item);
          io.to(String(item.userId)).emit(
            socketEvent.chat.receiveMessages,
            payload
          );
        });
      }
    });
  });
}
