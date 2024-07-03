import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';


const BarberProfile = () => {
    const { id } = useParams();
    const [barber, setBarber] = useState(null);
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchBarber = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/barbers/${id}`);
                const data = await response.json();
                setBarber(data);
            } catch (error) {
                console.error('Error fetching barber:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBarber();
    }, [id, setLoading]);

    if (!barber) {
        return null; // Or some placeholder content
    }

    return (
        <div className="barber-profile">
            <h1>{barber.name}</h1>
            <p>{barber.bio}</p>
            {/* Render other barber details here */}
        </div>
    );
};

export default BarberProfile;
