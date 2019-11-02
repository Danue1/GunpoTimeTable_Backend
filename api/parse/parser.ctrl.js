/*
 * 시간표 불러오기
 * 들어오는 쿼리 예시 : localhost:4001/api/parse/?dataGrade=1&dataClass=4
 * 기록되는 쿼리 : [Object: null prototype] { dataGrade: '1', dataClass: '4' }
 */

exports.getData = async (ctx) => {
    const schema = ctx.query;
    if (isNaN(Number(schema.dataGrade)) || isNaN(Number(schema.dataClass))) {
        ctx.status = 400; // Bad requset
        return;
    }

    ctx.body = "hello?";
};

exports.test = async (ctx) => {
    ctx.body = 'test';
};