const Router = require('koa-router');
const parse = new Router();
const parseCtrl = require('./parser.ctrl');

parse.get('/Get', parseCtrl.getData);
parse.post('/Insert', parseCtrl.insertData);

module.exports = parse;