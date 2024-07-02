import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';


const BarbershopPage = () => {
    const { id } = useParams();
    const [barbershop, setBarbershop] = useState(null);
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchBarbershop = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/barbershops/${id}`);
                const data = await response.json();
                setBarbershop(data);
            } catch (error) {
                console.error('Error fetching barbershop:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBarbershop();
    }, [id, setLoading]);

    if (!barbershop) {
        return null; // Or some placeholder content
    }

    return (
        <div className="barbershop-page">
            <h1>{barbershop.name}</h1>
            <p>{barbershop.description}</p>
            {/* Render other barbershop details here */}
        </div>
    );
};

export default BarbershopPage;
