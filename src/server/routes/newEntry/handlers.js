module.exports = {
    index: function (req, res) {
        res.render('newEntry', {
            data: 'Add new entry'
        });
    }
};
