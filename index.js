// import express from 'express';
// import http from 'http';
// import cors from 'cors'
// import { Server } from 'socket.io';
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
// app.use(cors());

// app.get('/', (req, res) => {
//     res.send('WebRTC Signaling Server');
// });

// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     // Handle the offer
//     socket.on('offer', (offer) => {
//         socket.broadcast.emit('offer', offer);
//     });

//     // Handle the answer
//     socket.on('answer', (answer) => {
//         socket.broadcast.emit('answer', answer);
//     });

//     // Handle ICE candidate
//     socket.on('ice-candidate', (candidate) => {
//         socket.broadcast.emit('ice-candidate', candidate);
//     });

//     // Handle disconnect
//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

// server.listen(5000, () => {
//     console.log('Server running on http://localhost:5000');
// // });
// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import { Server } from 'socket.io';
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('WebRTC Signaling Server');
// });

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Handle the offer
//   socket.on('offer', (offer) => {
//     socket.broadcast.emit('offer', offer);
//   });

//   // Handle the answer
//   socket.on('answer', (answer) => {
//     socket.broadcast.emit('answer', answer);
//   });

//   // Handle ICE candidate
//   socket.on('ice-candidate', (candidate) => {
//     socket.broadcast.emit('ice-candidate', candidate);
//   });

//   // Handle disconnect
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// server.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });








import express from "express";
import cors from "cors";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { Socket } from "dgram";

const app=express();
const server=http.createServer(app);
//craete instance of server
const io=new Server(server);
app.use(express.static(path.resolve('./public')));
// app.use(express.json());
// app.use(cors());

io.on('connection',(client)=>{
 client.on('message',(message)=>{
  console.log(message);
  client.broadcast.emit('message', message);
  // io.emit('message',message);
 })
})


app.get('/', (req, res) => {
  return res.sendFile("./public/index.html")
  });

server.listen(3000,()=>{
  console.log("Server is running on port 3000");
})

