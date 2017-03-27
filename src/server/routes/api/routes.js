const express = require('express');
const handlers = require('./handlers.js');
const router = express.Router();
const server = express();


// middleware to use for all requests
router.use(handlers.useMiddleware);
router.get('/', handlers.getDefaultApiMessage);
router.get('/entries', handlers.getAllEntries);
router.post('/entries', handlers.createEntry);
router.get('/entries/:_id', handlers.getEntryById);



server.use('/', router);
module.exports = server;
