import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Navbar />
            <div className="hero-section">
                <h1 className="title">Rate My Barber</h1>
                <p className="subtitle">Enter your location to get started</p>
                <SearchBar />
                <p className="alternative-search">I'd like to look up a barber by name</p>
            </div>
        </div>
    );
};

export default LandingPage;

