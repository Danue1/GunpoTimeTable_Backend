const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// sha 인코딩
const crypto = require('crypto');

// 시간표 데이터 테이블 구성
const TimeTable = new Schema({
    // 암호화 코드 (string)
    checkSum : {
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
    return crypto.createHmac('sha512', process.env.SCREAT_KEY)
        .update(checksum)
        .digest('hex');
}

// Create : 시간표 정보 추가하기
TimeTable.statics.addTableData = async function ({timetable, classtime, checksum}) {
    const query = new this({
        checksum: hash(unixTime() * process.env.CHECKSUM),
        data: {
            timeTable : timetable,
            classTime : classtime,
            unixTime : unixTime(),
        }
    });

    return await query.save();
};

// Read : 시간표 정보 읽기
TimeTable.statics.readTableData = async function () {
    return await this.find();
};

module.exports = mongoose.model('TimeTable', TimeTable);