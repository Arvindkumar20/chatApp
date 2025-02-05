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

const app = express();
const server = http.createServer(app);
//craete instance of server
const io = new Server(server);
app.use(express.static(path.resolve('./public')));
// app.use(express.json());
// app.use(cors());
let users = 0;


// create a namespace 
// const chatNamespace = io.of('/chat');
// chatNamespace.on('connection', (socket) => {
//   socket.emit('chat',{message:"Hello bro"})
//   console.log('new connectionspace with chat name', socket.id);
// })




// io.on('connection', (client) => {
//   users++;
//   client.broadcast.emit('user', users);
//   client.on('message', (message) => {
//     // console.log(message);
//     // io.emit('message', message);
//     //send message to evry user which comes from frontend
//     client.broadcast.emit('message', message);

//   });
//   // send welcome message here 
//   client.emit('welcome', { message: 'your welcome in this room' });
//   // send users numbers to all users excepts current  user
//   client.broadcast.emit('user', users);
// });


// create room 
const roomNamespace = io.of('/room');
roomNamespace.on('connection', (socket) => {
  users++;
   // Join a room
  socket.on('joinRoom', roomName => {
    socket.join(roomName);
    console.log(`User ${socket.id} joined room: ${roomName}`);
  })

  socket.on('sendMessage',({ roomName, username, message })=>{
    // emit to all users in the room
    io.to(roomName).emit("message", { username, message });
  });
  // send welcome message here
  socket.emit('chat', { message: 'your welcome in this room' });
  // send users numbers to all users excepts current  user
  socket.broadcast.emit('user', users);
  // send message to all users in room
  // socket.on('message', (message) => {
  //   // console.log(message);
  //   // send message to evry user which comes from frontend
  //   socket.broadcast.emit('message', message);
  // });
});

io.on('disconnect', () => {
  users--;
  // send users numbers to all users excepts current  user
  Socket.broadcast.emit("user", users);
});

app.get('/', (req, res) => {
  return res.sendFile("./public/index.html")
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
})

