const mongoose = require('mongoose');

const BarberSchema = new mongoose.Schema({
    name: String,
    barbershop: { type: mongoose.Schema.Types.ObjectId, ref: 'Barbershop' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Barber', BarberSchema);
