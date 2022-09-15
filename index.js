import express from "express";
const app = express();
import cors from "cors";
import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { socketHandle } from "./socket.handle.js";

const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io", "http://localhost:4310"],
    credentials: true,
  },
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

socketHandle(io);

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

instrument(io, { auth: false });
