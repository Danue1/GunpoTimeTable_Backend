const timetable = require('../../models/timetable');
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
 * 들어오는 쿼리 예시 :
 * {
 *     "data" : String,
 *     "checksum" : String
 * }
 */

exports.insertData = async (ctx) => {
    // 데이터 검증
    const schema = Joi.object().keys({
        data: Joi.string().required(),
        checksum: Joi.string().required(),
    });

    const result = Joi.validate(ctx.request.body, schema);

    // 스키마 검증 실패시
    if (result.error) {
        ctx.status = 400;
        return false;
    }

    let query = null;

    try {
        // TODO : 왜 작동하지 않는지 알아내기
       query = await TimeTable.addTableData(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body('success');


};