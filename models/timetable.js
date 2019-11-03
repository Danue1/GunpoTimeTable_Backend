const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// sha 인코딩
const crypto = require('crypto');

// 시간표 데이터 테이블 구성
const TimeTable = new Schema({
    data : {
        type : String
    },
    timetable : {
        type : Number
    },
    checksum : {
        type : String
    }
});

// 암호화 function
function hash(checksum) {
    return crypto.createHmac('sha512', process.env.SCREAT_KEY)
        .update(checksum)
        .digest('hex');
};

// UNIX 타임스탬프 function
function unixTime() {
    Math.round((new Date()).getTime() / 1000);
}

// timetable 업로드
TimeTable.statics.addTableData = function ({ data, checksum }) {
    const query = new this({
        data : data,
        timetable : unixTime(),
        checksum : hash(checksum)
    });

    return query.save();
};

module.exports = mongoose.model('TimeTable', TimeTable);