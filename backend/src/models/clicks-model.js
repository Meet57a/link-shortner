const mongoose = require('mongoose');

const { Schema } = mongoose;

const clickSchema = new Schema({

    urlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Url',
        required: true,
    },
    city: {
        type: String,

    },
    country: {
        type: String,
    },
    ip: {
        type: String,

    },
    device: {
        type: String,

    },
    timestamp: {
        type: Date,
    },
});

const Click = mongoose.model('Click', clickSchema);

module.exports = Click;