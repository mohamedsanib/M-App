const express = require('express');
const http = require('http');
const path = require('path');
const socket = require('socket.io');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT ||3000;

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

app.use(express.static('./public'));
app.use(cors());

app.get('/', (req, res)=>{
    return res.send('index.html');
})

io.on('connection', (socket) => {
    socket.on('chat-msg', (msg) => {
        io.emit('chat-msg', msg);
    });
});

server.listen(PORT, ()=>{
    console.log('Server running at PORT : ',PORT);
})