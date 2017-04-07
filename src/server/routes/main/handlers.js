const MongoClient = require('mongodb').MongoClient;
const dateService = require('./../../services/dateService');
const connectionUrl = require('./../../database.config').dbConnectionUrl;

function parseEntries(entries) {
    let newEntries = [];
    for(let i in entries) {
        if (entries.hasOwnProperty(i)) {
            let entry = entries[i];
            entry.dateTime = dateService.convertDate(entry.dateTime);
            newEntries.push(entry);
        }
    }
    return newEntries;
}

function renderPage(req, res) {
    MongoClient.connect(connectionUrl, function (err, database) {
        if (err) {
            throw err;
        }

        database.collection('diaryentries').find().toArray(function(err, results) {
            let parsedResults = parseEntries(results);

            res.render('index', {
                appTitle: 'Dev Diaries',
                entries: parsedResults
            });
        });
    });
}

module.exports = {
    index: renderPage,
    parseEntries
};
