const mongoose = require('mongoose');
// const PointSchema = require('../Models/pointSchema');

// just defining the pointSchema for point loaction....
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});


// creating schema for problemLocation collection

const ProblemLocationSchema = new mongoose.Schema({
    problemType: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

// exporting the model of this schema after making the model

var ProblemLocation = mongoose.model('problem_location', ProblemLocationSchema);
var pointLocation = mongoose.model('point', PointSchema);
module.exports = ProblemLocation;