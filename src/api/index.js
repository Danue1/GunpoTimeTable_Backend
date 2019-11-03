const Router = require('koa-router');
const api = new Router();
const parse = require('./parse');

api.use('/parse', parse.routes());

api.get('/', (ctx, next) => {
   ctx.body = 'GET' + ctx.request.path;
});

module.exports = api;