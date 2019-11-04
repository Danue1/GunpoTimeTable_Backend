/*
 * GunpoTimeTable Backend
 * v 0.0.2 (2019-11-02)
 * https://github.com/notkimwol/GunpoTimeTable_BackEnd.git
 */

/*
 * mongod --dbpath ./db
 */

require('dotenv').config();
// 포트가 없는 경우, 4001번 사용
const port = process.env.PORT || 4001;
const mongoose = require('mongoose');

// 미들웨어로 사용할 koa
const koa = require('koa');
const app = new koa();

// 라우팅에 사용될 koa-router
const Router = require("koa-router");
const router = new Router();

// API에 사용되는 koa-bodyparser 모듈
const bodyParser = require('koa-bodyparser');
const api = require('./api');

// MongoDB 연결
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(response => {
        console.log('[mongoDB] : success');
    })
    .catch(error => {
        console.log('[mongoDB] : ' + error);
    });

// 라우팅 설정
app
    .use(bodyParser())
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