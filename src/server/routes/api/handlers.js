const DiaryEntry = require('./../../models/diaryEntry');


function getDefaultApiMessage(req, res) {
    res.json({ message: 'You\'ve hit the api' });
}

function useMiddleware(req, res, next) {
    console.log('Hit the middleware at ' + Date() + ' to ' + req.url);
    next();
}

function createEntry(req, res) {
    let entry = new DiaryEntry();
    entry.title = req.body.title;
    entry.content = req.body.content;
    entry.dateTime = req.body.dateTime;
    entry.userId = req.body.userId;

    entry.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Entry created!' });
    });
}

function getAllEntries(req, res) {
    DiaryEntry.find(function(err, entries) {
        if (err) {
            res.send(err);
        }
        res.json(entries);
    });
}

function getEntryById(req, res) {
    DiaryEntry.findById(req.params._id, function(err, entry) {
        if (err)
            res.send(err);
        res.json(entry);
    });
}



module.exports = {
    getDefaultApiMessage,
    getAllEntries,
    getEntryById,
    createEntry,
    useMiddleware
};
