/*
 * 시간표 불러오기
 * 들어오는 쿼리 : [post] api/parse/
 * {
 *     "dataGrade" : number,
 *     "dataClass" : number
 * }
 */

// TODO : typeof 체크해서 맞으면 응답 주고, 틀리면 400 에러 뜨게 하는 기능 만들기
exports.getData = async (ctx) => {
    if (typeof(dataGrade) === Number && typeof(dataClass) === Number) {
        ctx.body(dataGrade + "|" + dataClass);
    } else {

    }
};

exports.test = async (ctx) => {
    ctx.body = 'test';
};