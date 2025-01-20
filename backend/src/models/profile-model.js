const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        default: ''
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('profile', profileSchema);

