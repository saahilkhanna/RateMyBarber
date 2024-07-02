import React, { useState } from 'react';
import { submitReview } from '../services/api';

const ReviewComponent = ({ barberId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitReview({ rating, comment, barber: barberId });
        setRating(0);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Rating:</label>
                <input type="number" value={rating} onChange={e => setRating(e.target.value)} />
            </div>
            <div>
                <label>Comment:</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} />
            </div>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewComponent;
