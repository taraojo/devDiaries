const MongoClient = require('mongodb').MongoClient;
const connectionUrl = require('./../../database.config').dbConnectionUrl;

module.exports = {
    index: function (req, res) {
        MongoClient.connect(connectionUrl, function (err, database) {
            if (err) {
                throw err;
            }

            database.collection('entries').find().toArray(function(err, results) {
                res.render('index', {
                    appTitle: 'Dev Diaries',
                    entries: results
                });
            });
        });
    }
};
