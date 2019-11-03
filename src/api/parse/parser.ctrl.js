const TimeTable = require('../../models/timetable');
const Joi = require('joi');

/*
 * Create : 테이블 새로 추가하기
 * 조건 : localhost만 사용 가능함.
 * API 호출 : [POST/JSON] localhost:4001/api/parse/test/
 *  {
 *      data: {
 *          "timeTable": String,
 *          "classTime": String
 *      }
 *  }
 * API 응답 : [200] Success
 */
exports.insertData = async (ctx) => {
    // API의 host가 localhost가 아닐시, 403 (forbidden)
    let ref = ctx.request.header.host;
    if (ref !== "localhost:4001" && ref !== "127.0.0.1:4001") {
        ctx.status = 403;
        // TODO : host가 다를시 오류 로그 저장하는 기능 만들기
        return false;
    }

    // 데이터 검증
    const schema = Joi.object().keys({
        data: {
            // 시간표
            timeTable: Joi.string().required(),
            // 시정표
            clasTime: Joi.string().required(),
        }
    });

    const result = Joi.validate(ctx.request.body, schema);

    // 스키마 검증 실패시 400 (Bad Request)
    if (result.error) {
        ctx.status = 400;
        // TODO : 검증 실패시 오류 로그 저장하는 기능 만들기
        return false;
    }

    // DB에 업로드
    let query = null;
    try {
        query = await TimeTable.addTableData(ctx.request.body);
        console.log(query);
        // 로그 저장은 models/timetabls.js 에서 동작함.
    } catch (error) {
        ctx.throw(500, error);
        // TODO : 에러 발생시 오류 로그 저장하는 기능 만들기
    }

    ctx.body = 'success';
};

/*
 * Read : 시간표 불러오기
 * API 호출 : [Get] localhost:4001/api/parse/get
 * API 응답 :
 * {
 *      checkSum : String,
 *      data: {
 *          timeTable : String,
 *          classTime : String,
 *          unixTime : Number
 *      }
 * }
 */
exports.getData = async (ctx) => {
    // 응답 데이터 검증


    let query = null;
    try {
        query = await TimeTable.readTableData();
    } catch (error) {
        ctx.throw(500, error);
        // TODO : 에러 발생시 오류 로그 저장하는 기능 만들기
    }
    
    ctx.body = "기능 추가 요함";
};