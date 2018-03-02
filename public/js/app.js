/**
 * SOCKET listen and firing
 */

var socket = io();

// APP connection to server with socket
socket.on('connect', function() {
    console.log('connected to server');
});

// APP listens for any emit newMsg event
socket.on('newMsg', function(msg) {
    console.log(`From: ${msg.from} -> ${msg.text}`);

    var formatTime = moment(msg.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formatTime
    });
    jQuery('#messages').append(html);
});

// APP listen for disconnect event from anywhere
socket.on('disconnect', function() {
    console.log('disconnected from server');
});


socket.emit('createMsg', {
    from: 'devin',
    text: 'hello'
}, function() {
    console.log('got it');
});

/**
 * DOM manipulation
 * JQuery
 */
// eventListener for submit on the form element to send message
jQuery('#message-form').on('submit', function(event) {
    event.preventDefault();

    // APP emits createMsg event to server, server distributes server
    // also has access to the function via a callback arg server side
    socket.emit('createMsg', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
    $('[name=message]').val('Message');
});