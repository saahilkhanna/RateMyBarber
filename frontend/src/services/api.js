const API_URL = 'http://localhost:5000/api';

export const getBarbershops = async () => {
    const response = await fetch(`${API_URL}/barbershops`);
    return await response.json();
};

export const getBarbershop = async (id) => {
    const response = await fetch(`${API_URL}/barbershops/${id}`);
    return await response.json();
};

export const getBarber = async (id) => {
    const response = await fetch(`${API_URL}/barbers/${id}`);
    return await response.json();
};

export const submitReview = async (review) => {
    const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });
    return await response.json();
};
