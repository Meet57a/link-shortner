const mongoose = require('mongoose');

const { Schema } = mongoose;

const urlSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    longUrl: {
        type: String,
        required: true,
        trim: true,
    },
    shortUrl: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    customUrl: {
        type: String,
        trim: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    qrCode: {
        type: String,
        trim: true,
    },
    currentDate: {
        type: String,
    },
    currentTime: {
        type: String,
    },
    


}, {});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;