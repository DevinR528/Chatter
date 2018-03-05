const expect = require('chai').expect;

var { isRealString, isUniqString } = require('./validator');


describe('isRealString', () => {
    it('should reject non string values', () => {
        var res = isRealString(98);

        expect(res).to.equal(false);
    });

    it('should reject a string of only spaces', () => {
        var res = isRealString('  ');

        expect(res).to.equal(false);
    });

    it('should allow a string with letters, numbers, and spaces', () => {
        var res = isRealString('poop 1');

        expect(res).to.equal(true);
    });
});

describe('isUniqString', () => {
    it('should return true if string value is unique', () => {
        var array = ['jim', 'devin', 'matt'];
        var name = 'bob';

        var res = isUniqString(array, name);

        expect(res).to.equal(true);
    });

    it('should return false if string is not unique', () => {
        var array = ['jim', 'devin', 'matt'];

        var resF = isUniqString(array, 'jim');

        expect(resF).to.equal(false);
    });
});