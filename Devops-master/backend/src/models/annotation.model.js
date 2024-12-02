const mongoose = require('mongoose');
const User = require('./user.model');

const AnnotationDataSchema = new mongoose.Schema({
    title: String,
    notes: String,
    priority: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    }
});

module.exports = mongoose.model('Annotations', AnnotationDataSchema);
