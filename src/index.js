/*
 * GunpoTimeTable Backend
 * v 0.0.2 (2019-11-02)
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

// comcigan-parser (https://github.com/leegeunhyeok/comcigan-parser)
const Timetable = require('comcigan-parser');
const timetable = new Timetable();

// http 리퀘스트에 사용될 request 모듈 (https://medium.com/harrythegreat/node-js%EC%97%90%EC%84%9C-request-js-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-28744c52f68d)
const request = require('request');

// 자동화에 사용될 cron 모듈 (https://hudi.kr/node-cron%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-node-js%EC%97%90%EC%84%9C-%ED%8A%B9%EC%A0%95-%EC%9E%91%EC%97%85%EC%97%90-%EC%8A%A4%EC%BC%80%EC%A4%84-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0/)
var cron = require('node-cron');

// DB 연결
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(response => {
        console.log('[mongoDB] : success');
        hello();
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

// API 라우팅
router.use('/api', api.routes());

// 서버 활성 상태 확인
app.listen(port, () => {
    console.log('[koa] : listen to ' + port);
});

// DB에 업로드 하는 함수
// TODO : 평일 오전 7시부터 10시까지 1시간 간격으로 실행시키는 기능 만들기
function hello() {
    (async () => {
        await timetable.init();
        await timetable.setSchool('군포e비즈니스고등학교');

        // 시간표 조회
        const result = await timetable.getTimetable();

        // 시간 조회
        const time = await timetable.getClassTime();

        // 시간표 + 시간 정보 입력
        const DBtimetable = JSON.stringify(result);
        const DBtime = JSON.stringify(time);

        let options = {
            uri: "http://127.0.0.1:4001/api/parse/insert",
            method: "POST",
            body: {
                "DBtimetable": DBtimetable,
                "DBtime": DBtime,
                "checksum": process.env.CHECKSUM
            },
            json: true
        };
        request.post(options, function (error, response, body) {
            if (error) {
                console.log('[AutoInsert] error : ' + error)
            } else {
                console.log('[AutoInsert] statusCode : ' + response.statusCode);
                console.log('[AutoInsert] body : ' + body);
            }
        });
    })();
}