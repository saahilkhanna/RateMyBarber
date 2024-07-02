const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    rating: Number,
    comment: String,
    barber: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);

