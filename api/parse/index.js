const Router = require('koa-router');
const parse = new Router();
const parseCtrl = require('./parser.ctrl');

parse.get('/get', parseCtrl.getData);
parse.post('/insert', parseCtrl.insertData);

module.exports = parse;