const Router = require('koa-router');
const parse = new Router();
const parseCtrl = require('./parser.ctrl');

parse.post('/', parseCtrl.getData);
parse.get('/test', parseCtrl.test);

module.exports = parse;