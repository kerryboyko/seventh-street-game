import express from 'express';
import {createServer} from 'node:http';
import { join } from 'node:path';
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../static', 'index.html'));
});

io.on('connection', (socket) => {
  socket.broadcast.emit('hi');

  console.log("A user connected: ", socket.id)
  socket.on('chat message', (msg) => {
    console.log("message: ", msg);
    io.emit('chat message', `${socket.id}:${msg}`);
  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});