const mongoose = require('mongoose')
const shortId = require('shortid')                 // to generate a short ID characterised to use that as a encrypted URl

const shortUrlSchema = new mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: shortId.generate                  // we have to generate a short random characterised URL which is default
    },
    clicks:{
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('ShortUrl',shortUrlSchema)  // exporting the model