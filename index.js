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

// comcigan-parser (https://github.com/leegeunhyeok/comcigan-parser)
const Timetable = require('comcigan-parser');
const timetable = new Timetable();

// sha 인코딩
const crypto = require('crypto');

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

// API 라우팅
router.use('/api', api.routes());

// 서버 활성 상태 확인
app.listen(port, () => {
    console.log('[koa] : listen to ' + port);
});

// DB에 업로드 하는 함수
(async () => {
    await timetable.init();
    await timetable.setSchool('군포e비즈니스고등학교');

    // 시간표 조회
    const result = await timetable.getTimetable();

    // 시간 조회
    const time = await timetable.getClassTime();

    // 시간표 + 시간 정보 입력
    const data = JSON.stringify(result) + JSON.stringify(time);

    // unix timestamp
    const dataTimeTable = Math.round((new Date()).getTime() / 1000);

    // hash
    const dataHash = function hash(checksum) {
        return crypto.createHmac('sha512', process.env.SCREAT_KEY)
            .update(checksum)
            .digest('hex');
    };

    const query = {
        "data" : data,
        "timetable" : dataTimeTable,
        "checksum" : dataHash
    };
    
    // TODO : DB 업로드 하는 기능 구현하기
})();