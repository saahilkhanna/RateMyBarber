import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPages/LandingPage';
import BarbershopPage from './components/LandingPages/BarbershopPage';
import BarberProfile from './components/LandingPages/BarberProfile';
import Login from './components/Login-Signup/Login';
import Signup from './components/Login-Signup/Signup';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import Loader from './components/Loader/Loader';
import SearchResultList from './components/LandingPageComponents/SearchResultList';
import './App.css';
import SearchBar from './components/LandingPageComponents/SearchBar'
import SearchResult from './components/LandingPageComponents/SearchResult';

const AppContent = () => {
    const { loading } = useLoading();
    const [results, setResults] = useState([]);

    return (
        <>
            {loading && <Loader />}
            <Routes>
                <Route path="/" element={<LandingPage setResults={setResults} />} />
                <Route path="/barbershop/:id" element={<BarbershopPage />} />
                <Route path="/barber/:id" element={<BarberProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/search-results" element={<SearchResultList results={results} />} />
            </Routes>
        </>
    );

};


function App() {
    return (
        <Router>
            <LoadingProvider>
                <div className="App">

                    <AppContent />
                </div>
            </LoadingProvider>
        </Router>
    );
}

export default App;
