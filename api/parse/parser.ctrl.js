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


    /*
    const schema = ctx.query;
    const dataGrade = Number(schema.queryGrade);
    const dataClass = Number(schema.queryClass);

    if (isNaN(dataGrade) || isNaN(dataClass)) {
        ctx.status = 400; // Bad requset
        return;
    }

    // 컴시간 정보 불러오기
    // TODO : 컴시간표 API 서버의 응답이 올 때 까지 API 응답을 늦추기
    // TODO : 새로운 개발 API 만들기

    var data = "";

    (async () => {
        await timetable.init();
        await timetable.setSchool('군포e비즈니스고등학교');

        // 각 반의 정보 조회
        const result = await timetable.getTimetable();
        // console.log(JSON.stringify(result[dataGrade][dataClass]));

        // 수업시간 정보 조회
        const time = timetable.getClassTime();
        // console.log(JSON.stringify(time));

        data = JSON.stringify(result[dataGrade][dataClass]) + JSON.stringify(time);
    })();

    ctx.body = data;
    */

};

exports.test = async (ctx) => {
    ctx.body = 'test';
};