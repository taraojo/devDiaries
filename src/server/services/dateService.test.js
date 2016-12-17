const dateService = require('./dateService');

describe('Date service', function() {

    describe('convertDate function', function() {

        it('should get 7th Dec from a date string', function() {
            expect(dateService.convertDate('Wed Dec 07 2016 22:01:54 GMT+0000 (GMT)')).to.equal('7th December \'16');
        });

        it('should get 17th Dec from a date string', function() {
            expect(dateService.convertDate('Sat Dec 17 2016 01:30:12 GMT+0000 (GMT)')).to.equal('17th December \'16');
        });

        it('should return null with dodgy date string', function() {
            expect(dateService.convertDate('some random date ')).to.equal(null);
        });

        it.skip('should return null with dodgy date with numbers string', function() {
            expect(dateService.convertDate('some random date 01')).to.equal(null);
        });
    });



    describe('getSuffix function', function() {

        it('should return st when 1 is passed in', function() {
            expect(dateService.getDateSuffix(1)).to.equal('st');
        });

        it('should return nd when 2 is passed in', function() {
            expect(dateService.getDateSuffix(2)).to.equal('nd');
        });

        it('should return rd when 3 is passed in', function() {
            expect(dateService.getDateSuffix(3)).to.equal('rd');
        });

        it('should return th when 24 is passed in', function() {
            expect(dateService.getDateSuffix(24)).to.equal('th');
        });

        it('should return th when 23 is passed in', function() {
            expect(dateService.getDateSuffix(23)).to.equal('rd');
        });

        it('should return th when 22 is passed in', function() {
            expect(dateService.getDateSuffix(22)).to.equal('nd');
        });

        it('should return null when text is passed in', function() {
            expect(dateService.getDateSuffix('some text')).to.equal(null);
        });

        it('should return null when minus val is passed in', function() {
            expect(dateService.getDateSuffix(-23)).to.equal(null);
        });
    });

});
