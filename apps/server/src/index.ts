import express from 'express';
import {createServer} from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';
import {wsServer, wsClient} from '@repo/websockets/commands'

console.log({wsServer, wsClient})

const app = express();
const server = createServer(app);
const io = new Server(server);
// Correctly get the directory of the current file
const currentDir = path.dirname(new URL(import.meta.url).pathname);

// Resolve the path to the HTML file
const pathToHtml = path.resolve(currentDir, "../static/index.html");

app.get('/', (req, res) => {
    res.sendFile(pathToHtml);
});


io.on('connection', (socket) => {
  socket.broadcast.emit(wsServer.CONNECTION_CONFIRMED);

  console.log(wsServer.CONNECTION_CONFIRMED, socket.id)
  socket.onAny((cmd) => {
    console.log("COMMAND: ", cmd)
  })
  socket.on(wsClient.CHAT_MESSAGE, (msg) => {
    console.log(wsClient.CHAT_MESSAGE, msg);
    io.emit(wsServer.CHAT_MESSAGE, `${socket.id}:${msg}`);
  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});