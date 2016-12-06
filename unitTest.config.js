const jsdom = require('jsdom');

const doc = jsdom.jsdom('<!doctype html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

const chai = require('chai');
chai.use(require('chai-as-promised'));

global.expect = chai.expect;
global.sinon = require('sinon');

var ignoreStyles = require('ignore-styles');

var controllers = require('require-all')({
    dirname     :  __dirname + '/src',
    filter      :  /.test.js$/,
    recursive   : true
});
