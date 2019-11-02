/*
 * GunpoTimeTable Backend
 * v 0.0.1 (2019-11-02)
 * https://github.com/notkimwol/GunpoTimeTable_BackEnd.git
 */

/*
 * mongoDB 사용
 * 실행 커맨드 : mongod --dbpath ./db
*/
require('dotenv').config();
// 포트가 없는 경우, 4001번 사용
const port = process.env.PORT || 4001;
const mongoose = require('mongoose');

// API에 사용되는 koa-bodyparser 모듈
const bodyParser = require('koa-bodyparser');
const api = require('./api');

// 미들웨어로 사용할 koa
const koa = require('koa');
const app = new koa();

// 라우팅에 사용될 koa-router
const Router = require("koa-router");
const router = new Router();

/*
 * 경로의 값을 알아오는 방법 : ctx.params
 * 쿼리 스트링일 경우 : ctx.requset.query
 */

// DB 연결
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
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

// 라우터
router.get('/', (ctx, next) => {
    ctx.body = '루트페이지';
});

router.get('/sub', (ctx, next) => {
    ctx.body = '서브페이지';
});

// API 라우팅
router.use('/api', api.routes());

// 서버 활성 상태 확인
app.listen(port, () => {
    console.log('[koa] : listen to ' + port);
});