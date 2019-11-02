const mongoose = require('mongoose');
var Schema = mongoose.Schema;

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