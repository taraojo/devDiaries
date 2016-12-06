const express = require('express');
const path = require('path');
const mainRoute = require('./routes/main/routes');
const newEntryRoute = require('./routes/newEntry/routes');
const exphbs = require('express-handlebars');

const server = express();

server.use('/assets', express.static('assets'));

server.engine('hbs', exphbs({
    extname:'hbs'
}));
server.set('view engine', 'hbs');

server.use('/', mainRoute);
server.use('/newEntry', newEntryRoute);

server.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening on port 3000!',path.resolve() , __dirname);//eslint-disable-line
});
