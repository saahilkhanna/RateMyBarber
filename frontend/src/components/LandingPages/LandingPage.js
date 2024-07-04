import React, {useState} from 'react';
import Navbar from '../LandingPageComponents/Navbar';
import SearchBar from '../LandingPageComponents/SearchBar';
import './LandingPage.css';


const LandingPage = () => {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ lng: null, lat: null });


    return (
        <div className="landing-page">
            <Navbar />
            <div className="hero-section">
                <h1 className="title">Rate My Barber</h1>
                <p className="subtitle">Enter your location to get started</p>
                <SearchBar setAddress={setAddress} setCoordinates={setCoordinates} />
                <p>lat: {coordinates.lat}</p>
                <p>long: {coordinates.lng}</p>
                <p>Address: {address}</p>
                <p className="alternative-search">I'd like to look up a barber by name</p>
            </div>
        </div>
    );
};

export default LandingPage;

