//test render and parseEntries functions
let handlers = require('./handlers');

describe('Testing coding test questions', function() {
    let rawEntries = [
        {
            id: 1234,
            title: 'First entry',
            content: 'This is the content of my first entry',
            dateTime: 'Wed Dec 07 2016 22:01:54 GMT+0000 (GMT)'
        },
        {
            id: 1235,
            title: 'Second entry',
            content: 'This is the content of my second entry',
            dateTime: 'Thu Dec 08 2016 22:01:54 GMT+0000 (GMT)'
        }
    ];

    let parsedEntries = [
        {
            id: 1234,
            title: 'First entry',
            content: 'This is the content of my first entry',
            dateTime: '7th December \'16'
        },
        {
            id: 1235,
            title: 'Second entry',
            content: 'This is the content of my second entry',
            dateTime: '8th December \'16'
        }
    ];


    it('returns parsed array', function() {
        expect(handlers.parseEntries(rawEntries)).to.deep.equal(parsedEntries);
    });

});
