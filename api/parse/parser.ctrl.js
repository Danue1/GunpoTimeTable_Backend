const TimeTable = require('../../models/timetable');
const Joi = require('joi');

/*
 * 시간표 불러오기
 * 들어오는 쿼리 예시 : localhost:4001/api/parse/?dataGrade=1&dataClass=4
 * 기록되는 쿼리 : [Object: null prototype] { queryGrade: '1', queryClass: '4' }
 */

exports.getData = async (ctx) => {
    // 데이터 검증
    const schema = Joi.object().keys({
        data: Joi.String().required(),
        timetable: Joi.Number().required(),
        checksum: Joi.String().required(),
    });

    const result = Joi.validate(ctx.request.body, schema);

    // 스키마 검증 실패시
    if (result.error) {
        ctx.status = 400;
        return false;
    }

    const timetable_raw = ctx.request.body;
    const timetable = JSON.parse(timetable_raw);

    console.log(timetable);
};

/*
 * 시간표 덮어쓰기 (자동적으로 실행됨)
 * 조건 : localhost only
 * API 링크 : [POST] localhost:4001/api/parse/test/
 * 들어오는 쿼리 예시 :
 * {
 *     "data" : String,
 *     "checksum" : String
 * }
 */

exports.insertData = async (ctx) => {

    console.log(ctx);

    // 외부에서 Data 삽입시 403 (forbidden)
    let ref = ctx.request.header.host;
    if (ref !== "localhost:4001" && ref !== "127.0.0.1:4001") {
        ctx.status = 403;
        return false;
    }

    // 데이터 검증
    const schema = Joi.object().keys({
        data: Joi.string().required(),
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

    ctx.body= "success";


};