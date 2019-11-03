const Router = require('koa-router');
const parse = new Router();
const parseCtrl = require('./parser.ctrl');

// Get All Table Data
parse.get('/getidx', parseCtrl.getidx);

// Add New Table Data
parse.post('/insert', parseCtrl.insertData);

// Get All Table Data
parse.get('/get', parseCtrl.getData);

module.exports = parse;