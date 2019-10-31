const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('Tag', schema)