var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('newMsg', function(msg) {
    var clientMsg = msg;
    console.log(`New Message from: ${clientMsg.from} -> ${clientMsg.text} at ${clientMsg.createdAt}`);
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});