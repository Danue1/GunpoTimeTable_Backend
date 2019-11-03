const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// sha 인코딩
const crypto = require('crypto');

// 시간표 데이터 테이블 구성
const TimeTable = new Schema({
    DBtimetable: {
        type: String
    },
    DBtime: {
        type: String
    },
    timetable: {
        type: Number
    },
    checksum: {
        type: String
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
    return Math.round((new Date()).getTime() / 1000);
}

// DB에 시간표 업로드
TimeTable.statics.addTableData = async function ({DBtimetable, DBtime, checksum}) {
    const query = new this({
        DBtimetable: DBtimetable,
        DBtime: DBtime,
        timetable: unixTime(),
        checksum: hash(checksum)
    });
    return await query.save();
};

// Read : 시간표 정보 읽기
TimeTable.statics.readTableData = async function () {
    return await this.find();
};

module.exports = mongoose.model('TimeTable', TimeTable);