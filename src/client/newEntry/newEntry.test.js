const newEntry = require('./newEntry.js');

describe('Testing coding test questions', function() {

    it('returns first argument', function() {
        expect(newEntry.returnArgs(7, 10)).to.equal(7);
    });

    it('returns the string', function() {
        expect(newEntry.returnArgs('I love tests')).to.equal('I love tests');
    });

});
