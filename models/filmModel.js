var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var filmModel = new Schema({
    title: {
        type: String
    },
    regisseur: {type: String},
    genre: {type: String},
    seen: {type: Boolean, default: false}

});

module.exports = mongoose.model('Film', filmModel)