/**
 * Chatter App Server
 */
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const path = require('path');

const publicPath = path.join(__dirname, '/../public/');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socket(server);

app.use(express.static(publicPath));

/**
 * @event connection on socket connection 
 */
io.on('connection', (socket) => {
    console.log('Server connected to client socket: ' + JSON.stringify(socket[0]));
});

/**
 * http server listens on port 
 */
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});