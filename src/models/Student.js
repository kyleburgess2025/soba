const mongoose = require('mongoose');

const MIN_ROOMMATE_NUM = 0;
const MAX_ROOMMATE_NUM = 9;

const MIN_PRIORITY_POINT = 1;
const MAX_PRIORITY_POINT = 4;

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    roommates: {
        type: Array,
        required: true
    },
    num_roommate: {
        type: Number,
        min: MIN_ROOMMATE_NUM,
        max: MAX_ROOMMATE_NUM,
        required: true
    }, 
    school: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        min: MIN_PRIORITY_POINT,
        max: MAX_PRIORITY_POINT,
        required: true
    },
    savedDorms: {
        type: Array,
        required: true
    }
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;