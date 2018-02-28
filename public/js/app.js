var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    // client sends msg to server
    socket.emit('createMsg', JSON.stringify({
        from: 'Devin',
        text: 'hello server'
    }));
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMsg', function(msg) {
    var clientMsg = JSON.parse(msg);
    console.log(`New Message from: ${clientMsg.from} -> ${clientMsg.text} at ${clientMsg.timeStamp}`);
});