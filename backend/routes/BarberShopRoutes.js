const express = require('express');
const router = express.Router();
const axios = require('axios');
const BarberShop = require('../models/BarberShop');

// Create a new barbershop
router.post('/', async (req, res) => {
    const newBarbershop = new BarberShop(req.body);
    try {
        const savedBarbershop = await newBarbershop.save();
        res.json(savedBarbershop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a barbershop by ID
router.get('/:id', async (req, res) => {
    try {
        const barbershop = await BarberShop.findById(req.params.id).populate('reviews');
        res.json(barbershop);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Search barbershops by location
router.get('/search', async (req, res) => {
    const location = req.query.location;
    const apiKey = 'AIzaSyApWyXIWiMIyuCofGQnm4yHaVNfxeWn5qk';  // Replace with your actual API key

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=barbershops+in+${location}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const barbershops = response.data.results;
        res.json(barbershops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
