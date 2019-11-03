const Router = require('koa-router');
const parse = new Router();
const parseCtrl = require('./parser.ctrl');

parse.post('/', parseCtrl.getData);
parse.post('/test', parseCtrl.insertData);

module.exports = parse;