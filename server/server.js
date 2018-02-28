import { Socket } from 'dgram';

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

server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});