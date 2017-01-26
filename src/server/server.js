//Node imports
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

//Routes
const mainRoute = require('./routes/main/routes');
const newEntryRoute = require('./routes/addEntry/routes');

const connectionUrl = require('./database.config').dbConnectionUrl;
const DiaryEntry = require('./models/diaryEntry');

const server = express();
const port = process.env.PORT || 3000;

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


// ROUTES FOR API
const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/entries')

    // create an entry
    .post(function(req, res) {

        let entry = new DiaryEntry();
        entry.title = req.body.title;
        entry.entry = req.body.content;
        entry.dateTime = req.body.dateTime;
        entry.userId = req.body.userId;

        entry.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Entry created!' });
        });
    })

    .get(function(req, res) {
        DiaryEntry.find(function(err, entries) {
            if (err) {
                res.send(err);
            }
            res.json(entries);
        });
    })

    .get(function(req, res) {
        DiaryEntry.findById(req.params.entry_id, function(err, entry) {
            if (err)
                res.send(err);
            res.json(entry);
        });
    });


router.get('/', function(req, res) {
    res.json({ message: 'You\'ve hit the api' });
});

// REGISTER ROUTES -------------------------------
server.use('/', mainRoute);
server.use('/api', router);
server.use('/assets', express.static('assets'));
server.use('/addEntry', newEntryRoute);





server.listen(port, () => {
    console.log('Dev Diaries app listening on port 3000', path.resolve(), __dirname);//eslint-disable-line
});
