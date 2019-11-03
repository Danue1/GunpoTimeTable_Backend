const TimeTable = require('../../models/timetable');
const Joi = require('joi');

/*
 * Create : 테이블 새로 추가하기
 * 조건 : localhost만 사용 가능함.
 * API 호출 : [POST/JSON] localhost:4001/api/parse/test/
 * API 응답 :
exports.getData = async (ctx) => {
    // 데이터 검증
    let query = null;
    try {
        query = await TimeTable.readTableData();
    } catch (e) {
        ctx.throw(500, e);
    }
    
    // TODO 아래 코드 활성화 시키기
    /*
     * DBtimetable : 시간표 정보
     * time : 시정 시간 정보
     * timetable : UNIX 타임테이블
     * checksum : 체크섬
     */
    // TODO : checksum 더 개선하기
    /*
    const schema = Joi.object().keys({
        DBtimetable: Joi.String().required(),
        DBtime: Joi.String().required(),
        timetable: Joi.Number().required(),
        checksum: Joi.String().required(),
    });

    const result = Joi.validate(ctx.request.body, schema);

    // 스키마 검증 실패시 Bad Request
    if (result.error) {
        ctx.status = 400;
        return false;
    }

    const timetable_raw = ctx.request.body;
    const timetable = JSON.parse(timetable_raw);
*/
    ctx.body = query;
};

/*
 * 시간표 덮어쓰기 (자동적으로 실행됨)
 * 조건 : localhost only
 * API 링크 : [POST/JSON] localhost:4001/api/parse/test/
 * 들어오는 쿼리 예시 :
 * {
 *     "DBtimetable" : String,
 *     "DBttime" : String,
 *     "checksum" : String
 * }
 */
exports.insertData = async (ctx) => {
    // 외부에서 Data 삽입시 403 (forbidden)
    let ref = ctx.request.header.host;
    if (ref !== "localhost:4001" && ref !== "127.0.0.1:4001") {
        ctx.status = 403;
        return false;
    }

    // 데이터 검증
    const schema = Joi.object().keys({
        DBtimetable: Joi.string().required(),
        DBtime: Joi.string().required(),
        checksum: Joi.string().required(),
    });

    const result = Joi.validate(ctx.request.body, schema);

    // 스키마 검증 실패시 400 (Bad Request)
    if (result.error) {
        ctx.status = 400;
        return false;
    }

    // DB에 업로드
    let query = null;
    try {
        query = await TimeTable.addTableData(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = ctx.request.body;
};

/*
 * Read : 시간표 불러오기
 * API 호출 : [Get] localhost:4001/api/parse/get
 * API 응답 :
 * {
 *     DBtimetable: String,
 *     DBtime : String,
 *     timetabla : Number,
 *     checksum : String
 * }
 */