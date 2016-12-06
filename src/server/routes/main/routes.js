const express = require('express');
const handlers = require('./handlers.js');

const server = express();
server.get('/', handlers.index);

module.exports = server;
