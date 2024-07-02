const express = require('express');
const router = express.Router();
const Barber = require('../models/Barber');

// Create a new barber
router.post('/', async (req, res) => {
    const newBarber = new Barber(req.body);
    try {
        const savedBarber = await newBarber.save();
        res.json(savedBarber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a barber by ID
router.get('/:id', async (req, res) => {
    try {
        const barber = await Barber.findById(req.params.id).populate('reviews');
        res.json(barber);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
