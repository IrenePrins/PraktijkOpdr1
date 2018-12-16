let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let filmModel = new Schema({
    title: {
        type: String,
        required: true
    },
    regisseur: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean, 
        default: false,
        required: true}

});

module.exports = mongoose.model('Film', filmModel)