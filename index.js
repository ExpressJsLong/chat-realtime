import express from "express";
const app = express();
import cors from "cors";
import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { socketHandle } from "./src/socket.handle.js";
import { route } from "./src/route.js";

import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io", "http://localhost:4310"],
    credentials: true,
  },
});

app.use(express.static("public"));

route(app);

socketHandle(io);

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

instrument(io, { auth: false });
