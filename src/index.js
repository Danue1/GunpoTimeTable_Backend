/*
 * GunpoTimeTable Backend
 * v 0.0.5 (2019-11-04)
 * https://github.com/notkimwol/GunpoTimeTable_BackEnd.git
 */

/*
 * mongod --dbpath ./db
 */

require('dotenv').config();

const mongoose = require('mongoose');
const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const api = require('./api');

const port = process.env.PORT || 4001;

// MongoDB 연결
mongoose.Promise = Promise;
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(response => {
        console.log('[mongoDB] : success');
    })
    .catch(error => {
        console.log('[mongoDB] : ' + error);
    });

const app = new koa();
const router = new Router();

// 라우팅 설정
app.use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

// 루트 페이지 라우팅
router.get('/', (ctx, next) => {
    // TODO : 루트 페이지를 프론트와 연동하기
    ctx.body = '루트페이지';
});

// API 라우팅
router.use('/api', api.routes());

// 서버 활성화 로그
app.listen(port, () => {
    console.log('[koa] : listen to ' + port);
    // TODO : 서버 활성화시 로그 저장하는 기능 만들기
});
