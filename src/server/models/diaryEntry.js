const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const EntrySchema   = new Schema({
    title: String,
    content: String,
    dateTime: Date,
    userId: String
});

module.exports = mongoose.model('DiaryEntry', EntrySchema);