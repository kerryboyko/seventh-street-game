import express from 'express';
import {createServer} from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';
import {wsServer, wsClient} from '@repo/websockets/commands'
import UserRegistration from './User/UserRegistration.js';

console.log({wsServer, wsClient})
const PORT = 5000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Replace with your Vite dev server URL
    methods: ["GET", "POST"]
  }
});
// Correctly get the directory of the current file
const currentDir = path.dirname(new URL(import.meta.url).pathname);

// Resolve the path to the HTML file
const pathToHtml = path.resolve(currentDir, "../static/index.html");

app.get('/', (req, res) => {
    res.sendFile(pathToHtml);
});

const userRegistration = UserRegistration.getInstance();

io.on('connection', (socket) => {
  socket.broadcast.emit(wsServer.CONNECTION_CONFIRMED);
  userRegistration.registerSocket(socket);

  console.log(wsServer.CONNECTION_CONFIRMED, socket.id)
  socket.onAny((cmd) => {
    console.log("COMMAND: ", cmd)
  })
  socket.on(wsClient.LOG_ME, (msg) => {
    console.log(`Message from client ${socket.id}: ${msg}`)
  })
  socket.on(wsClient.CHAT_MESSAGE, (msg) => {
    console.log(wsClient.CHAT_MESSAGE, msg);
    socket.emit(wsServer.CHAT_MESSAGE, `Private to ${socket.id} Foo`)
    io.emit(wsServer.CHAT_MESSAGE, `${socket.id}:${msg}`);
    userRegistration.debug();
  })
  socket.on(wsClient.CREATE_NEW_GAME, () => {
    const code = "REGOHONION";
    console.log(`Creating Game: ${code}`)
    socket.join(code);
    io.to(code).emit(wsServer.NEW_GAME_CREATED, code);
    socket.emit(wsServer.LOG_ME, `You have joined room ${code}`)
  })
})
io.on('disconnect', (socket) => {
  console.log(`Disconnected, ${socket.id}`)
  userRegistration.removeUser(socket.id);
})

io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

io.of("/").adapter.on("join-room", (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});



server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});