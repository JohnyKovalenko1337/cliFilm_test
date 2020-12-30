const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const film = new Schema({
    title: {
        type: String,
        required: true
    },
    released: {
        type: Number,
        required: true
    },
    format: {
        type: String,
        enum: ['VHS', 'DVD', 'Blu-Ray'],
        required: true
    },
    actors: {
        names: [{
            type: String,
            required: true
        }]
    },

});

module.exports = mongoose.model('film', film);