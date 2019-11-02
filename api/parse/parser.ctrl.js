// comcigan-parser
const Timetable = require('comcigan-parser');
const timetable = new Timetable();

/*
 * 시간표 불러오기
 * 들어오는 쿼리 예시 : localhost:4001/api/parse/?dataGrade=1&dataClass=4
 * 기록되는 쿼리 : [Object: null prototype] { queryGrade: '1', queryClass: '4' }
 */

exports.getData = async (ctx) => {
    const schema = ctx.query;
    const dataGrade = Number(schema.queryGrade);
    const dataClass = Number(schema.queryClass);

    if (isNaN(dataGrade) || isNaN(dataClass)) {
        ctx.status = 400; // Bad requset
        return;
    }

    // 컴시간 정보 불러오기
    // TODO : 컴시간표 API 서버의 응답이 올 때 까지 API 응답을 늦추기

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
    })().then(ctx.body = data);

    // ctx.body = data;

};

exports.test = async (ctx) => {
    ctx.body = 'test';
};