const mongoose = require('mongoose');

// just defining the pointSchema for point loaction....

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'point',
        required: true
    },
    coordinates: {
        type: Number,
        required: true
    }
});

var point = mongoose.model('point', PointSchema);
module.exports = point;