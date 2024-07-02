const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create a new review
router.post('/', async (req, res) => {
    const newReview = new Review(req.body);
    try {
        const savedReview = await newReview.save();
        res.json(savedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
