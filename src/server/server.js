//Node imports
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

//Routes
const mainRoute = require('./routes/main/routes');
const newEntryRoute = require('./routes/addEntry/routes');
const apiRoute = require('./routes/api/routes');

const connectionUrl = require('./database.config').dbConnectionUrl;

const server = express();
const port = process.env.PORT || 3030;

server.engine('hbs', exphbs({
    extname: 'hbs'
}));
server.set('view engine', 'hbs');


// BASE SETUP
mongoose.connect(connectionUrl);


// configure app to use bodyParser()
// this will get the data from a POST
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


// REGISTER ROUTES -------------------------------
server.use('/', mainRoute);
server.use('/api', apiRoute);
server.use('/assets', express.static('assets'));
server.use('/addEntry', newEntryRoute);

//Send service worker
server.use('/service-worker.js', function (req, res) {
    res.sendFile(path.resolve() + '/service-worker.js');
});





server.listen(port, () => {
    console.log('Dev Diaries app listening on port 3030', path.resolve(), __dirname);//eslint-disable-line
});
