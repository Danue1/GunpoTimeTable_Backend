const Router = require('koa-router');
const parse = new Router();
const parseCtrl = require('./parser.ctrl');

parse.get('/parse/:key(grade|class)/:value', parseCtrl.getData);
parse.get('/parse/test', parseCtrl.test);

module.exports = parse;