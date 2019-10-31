const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
    }
})

schema.set('timestamps', true)

module.exports = mongoose.model('Article', schema)