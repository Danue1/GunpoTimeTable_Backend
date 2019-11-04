const Router = require('koa-router');
const parse = new Router();
const parseCtrl = require('./parser.ctrl');

// Add New Table Data
parse.post('/insert', parseCtrl.insertData);

// Get All Table Data
parse.get('/get', parseCtrl.getData);

// Get Recent Table ID
parse.get('/getidx', parseCtrl.getidx);

module.exports = parse;