// TODO : 왜 API가 응답하지 않는지 확인하기

exports.getData = async (ctx) => {
  ctx.body = 'parsed';
};

exports.test = async (ctx) => {
    ctx.body = 'test';
};