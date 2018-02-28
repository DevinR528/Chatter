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
    console.log('Server connected to client socket: ' + socket[0]);

    /**
     * @event createMsg when client fires createMsg server socket listens for it
     */
    socket.on('createMsg', (msg) => {
        var parseMsg = JSON.parse(msg);
        console.log(`New Message from ${parseMsg.from} -> ${parseMsg.text}`);
        // io.emit emits to every connection socket only one
        io.emit('newMsg', JSON.stringify({
            from: 'Austin',
            text: 'Hey',
            timeStamp: new Date().getTime()
        }));
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