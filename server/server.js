const express = require('express');
const io = require('socket.io');
const http = require('http');
const https = require('http2');
const path = require('path');

const publicPath = path.join(__dirname, '/../public/');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});