/**
 * Chatter App Server
 */
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const path = require('path');

const { generateMessage } = require('./utils/message');
const { isRealString, setUrl, isUniqString } = require('./utils/validator');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '/../public/');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socket(server);
var users = new Users();

app.use(express.static(publicPath));

/**
 * @event connection on socket connection from any 'connecting' socket
 */
io.on('connection', (socket) => {
    console.log('New user connected');

    /**
     * @event join client fills out login form a specific socket hosts the room
     */
    socket.on('join', (params, callback) => {
        var userList = users.getUserList(params.room);
        console.log(userList);
        if ((!isRealString(params.from) || !isRealString(params.room)) || (!isUniqString(userList, params.from))) {
            callback(`Name and Room are required or Name is taken`);
        } else {
            socket.join(params.room);
            //users.removeUser(socket.id);
            users.addUser(socket.id, params.from, params.room);

            //emit updateUserList to only one room so users are current
            io.to(params.room).emit('updateUserList', users.getUserList(params.room));

            // message from chatter to user for joining
            socket.emit('newMsg', generateMessage('Chatter App', 'Thanks and welcomes you to Chatter.'));

            // message to everyone but new user that a new user is logged on
            socket.broadcast.to(params.room).emit('newMsg', generateMessage('Chatter App', `${params.from} has joined ${params.room}`));
        }

        callback();
    });

    /**
     * @event phone client invites user via phone # a text is sent with room url
     */
    socket.on('phone', (params, callback) => {
        console.log(setUrl(params.phoneNum, params.roomUrl));
        callback('for errors');
    });


    /**
     * @event createMsg when client fires createMsg server socket listens for it
     */
    socket.on('createMsg', (msg, callback) => {
        var user = users.getUser(socket.id);

        if (user[0] && isRealString(msg.text)) {
            // server grabs message from single user and sends it out to all users in room io.__ is all listening
            io.to(user[0].room).emit('newMsg', generateMessage(user[0].name, msg.text));
        }

        // callback gets sent back to createMsg emitter any args in callback
        // are sent back as to the callback func in the emitter
        callback();
    });

    /**
     * @event disconnected from client socket connection 
     * @prop this User is name not from
     */
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        console.log('USER', user);
        if (user[0]) {
            io.to(user[0].room).emit('updateUserList', users.getUserList(user[0].room));
            io.to(user[0].room).emit('newMsg', generateMessage('Chatter', `${user[0].name} has left the ${user[0].room}`));
        }
    });
});

/**
 * http server listens on port 
 */
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});