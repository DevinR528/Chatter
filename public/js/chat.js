/**
 * SOCKET listen and firing
 */

var socket = io();

function scrollToBottom() {
    //selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight || (newMessage.next())) {
        messages.scrollTop(scrollHeight);
    }
}
// APP connection to server with socket
socket.on('connect', function() {

    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            window.location.href = '/';
            alert(err);
        } else {
            console.log('no err');
        }

    });
});

socket.on('updateUserList', function(users) {
    var ol = jQuery('<ul></ul>');

    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

// APP listens for any emit newMsg event
socket.on('newMsg', function(msg) {
    var params = jQuery.deparam(window.location.search);
    var formatTime = moment(msg.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();

    var html = Mustache.render(template, {
        from: msg.from,
        text: msg.text,
        createdAt: formatTime
    });
    // if message is sent from self right align 
    if (params.from === msg.from) {
        // adds message formatted var into the html
        jQuery('#messages').append(html).fadeIn(500);

        // the user sent msg look different by altering css
        jQuery('.message:last-child').css({
            'border': '4px solid #7b35bd',
            'border-radius': '5px',
            'font': '900',
            'text-align': 'right'
        });

        scrollToBottom();

        // else msg from other users appear normal
    } else {
        jQuery('#messages').append(html).fadeIn(750);

        scrollToBottom();
    }
});

// APP listen for disconnect event from anywhere
socket.on('disconnect', function() {
    console.log('disconnected from server');
});

/**
 * DOM manipulation
 * JQuery
 */
// eventListener for submit on the form element to send message
jQuery('#message-form').on('submit', function(event) {
    event.preventDefault();
    var urlStr = jQuery.deparam(window.location.search);

    // APP emits createMsg event to server, server distributes message
    // also has access to the function via a callback arg server side
    socket.emit('createMsg', {
        text: $('[name=message]').val()
    }, function() {
        $('[name=message]').val('');
    });
});

// eventListener for invite click, dialog box for phone number to send
// text of url for room
var inviteButton = jQuery('#send-invite');
inviteButton.on('click', function(event) {

    inviteButton.attr('disabled', 'disabled').text('Sending invite...');
    socket.emit('phone', {
        roomUrl: window.location.href,
        phoneNum: prompt('Phone Number', '2695693478')
    }, function(err) {
        alert(`${phoneNum} ${err} invited`);
    });
    inviteButton.removeAttr('disabled').text('invite');
});