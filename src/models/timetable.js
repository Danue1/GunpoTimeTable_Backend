const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// SHA-256 인코딩 해주는 함수
const crypto = require('crypto');

// 시간표 데이터 테이블 구성
const TimeTable = new Schema({
    // 암호화 코드 (string)
    checkSum: {
        type: String,
    },
    data: {
        // 시간표 (String)
        timeTable: {
            type: String,
        },
        // 시정표 (string)
        classTime: {
            type: String,
        },
        // Unix 시간 (Number)
        unixTime: {
            type: Number,
        },
    }
});

// unitTime function
function unixTime() {
    return Math.round((new Date()).getTime() / 1000);
}

// hash Function
function hash(checksum) {
    return crypto.createHmac('sha512', process.env.HASH_KEY)
        .update(checksum)
        .digest('hex');
}

// Create : 시간표 정보 추가하기
TimeTable.statics.addTableData = async function ({_id, "data": {timeTable, classTime}}) {
    const query = new this({
        _id: _id,
        checkSum: hash(process.env.CHECKSUM),
        data: {
            timeTable: timeTable,
            classTime: classTime,
            unixTime: unixTime(),
        },
    });

    // TODO : 쿼리 업로드시 정상 로그 저장하는 기능 만들기
    return await query.save();
};

// Read : 시간표 정보 읽기
TimeTable.statics.readTableData = async function () {
    // TODO : 정보를 불러올 때 정상 로그 저장하는 기능 만들기
    // checksum, data { timeTable, classTime, unixTime }, id 를 리턴
    return await this.findOne(null, {__v : 0});
};

// Read : 최근 시간표 idx 불러오기
TimeTable.statics.readTableIdx = async function () {
    // _id 만 리턴
    return await this.findOne(null, {checkSum : 0, data : 0, __v : 0});
};

module.exports = mongoose.model('TimeTable', TimeTable);