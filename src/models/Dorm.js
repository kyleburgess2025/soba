const mongoose = require('mongoose');

const DormSchema = new mongoose.Schema({
    dorm_name: {
        type: String,
        required: true,
    },
    dorm_amenities: {
        type: Array,
        required: true,
    },
    dorm_img_url: {
        type: String,
        required: true,
    },
    dorm_room_plan: {
        type: Array,
        required: true,
    },
    dorm_room_types: {
        type: Array,
        required: true,
    },
});

const Dorm = mongoose.model('Dorm', DormSchema);
module.exports = Dorm;