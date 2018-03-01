/**
 * Chatter App Server
 */
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const path = require('path');

const { generateMessage } = require('./utils/message');

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
    console.log('Server connected to client socket: ' + socket[0]);

    // message from chatter to user for joining
    socket.emit('newMsg', generateMessage('The fine folks at Chatter.', 'Thanks and welcome to Chatter.'));

    // message to everyone but new user that a new user is logged on
    socket.broadcast.emit('newMsg', generateMessage('The fine folks at Chatter.', 'A new user has joined us.'));

    /**
     * @event createMsg when client fires createMsg server socket listens for it
     */
    socket.on('createMsg', (msg) => {
        // TODO parseMsg is not need yet change if able
        var parseMsg = msg;
        console.log(`New Message from ${parseMsg.from} -> ${parseMsg.text} at ${parseMsg.createdAt}`);
        // server grabs message from single user and sends it out to all users io.__ is all listening
        io.emit('newMsg', generateMessage(parseMsg.from, parseMsg.text));
    });

    /**
     * @event disconnected from client socket connection 
     */
    io.on('disconnect', (socket) => {
        console.log('Server disconnected from client socket: ' + socket[0]);
    });
});


/**
 * http server listens on port 
 */
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});