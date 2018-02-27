const express = require('express');
const io = require('socket.io');
const http = require('http');
const https = require('http2');
const path = require('path');

const publicPath = path.join(__dirname, '/../public/');

console.log(__dirname);