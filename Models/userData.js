const mongoose = require('mongoose');

// problem location schema.

const userDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {collection: 'userData'});

//var UserData = module.exports = mongoose.model('UserData', userDataSchema);
var UserData = mongoose.model('userData', userDataSchema);
module.exports = UserData;