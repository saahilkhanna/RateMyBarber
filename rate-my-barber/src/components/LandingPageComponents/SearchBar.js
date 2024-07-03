import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input';  // Ensure correct import path
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [input, setInput] = useState('Where do you want to find a barbershop?');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const fetchData = async (value) => {
        console.log("API Key:", process.env.AIzaSyApWyXIWiMIyuCofGQnm4yHaVNfxeWn5qk);

        if (value.length === 0) {
            setSuggestions([]);
            return;
        }

        try {
            const apiKey = process.env.AIzaSyApWyXIWiMIyuCofGQnm4yHaVNfxeWn5qk
            const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
                params: {
                    input: value,
                    types: 'establishment',
                    language: 'en',
                    key: apiKey,
                },
            });
            const results = response.data.predictions.map(prediction => ({
                description: prediction.description,
            }));
            setSuggestions(results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setInput(value);
        fetchData(value);
    };

    const handleFocus = () => {
        setInput('');
    };

    const handleBlur = () => {
        if (input === '') {
            setInput('Where do you want to find a barbershop?');
        }
        // Hide suggestions after a delay to allow onMouseDown event to trigger
        setTimeout(() => setSuggestions([]), 100);
    };

    const handleSuggestionClick = (description) => {
        setInput(description);
        setSuggestions([]);
        navigate(`/search-results?query=${description}`);
    };

    const handleKeyUp = () => {
        clearTimeout(timeoutVar);
        timeoutVar = setTimeout(() => {
            fetchData(input);
        }, 1800);
    };

    let timeoutVar;

    const handleKeyDown = () => {
        clearTimeout(timeoutVar);
    };

    const handleSearchButtonClick = () => {
        navigate(`/search-results?query=${input}`);
    };

    return (
        <div className="input-wrapper" id="input-wrapper">
            <Input
                type="text"
                name="search"
                value={input}
                onChange={handleChange}
                autoComplete="off"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
            />
            <div className="input-wrapper__text">
                <div className="input-wrapper__text__left">FIND A BARBERSHOP</div>
                <div className="input-wrapper__text__right">
                    <div className="input-wrapper__text__right__go-right" />
                </div>
            </div>
            <button onClick={handleSearchButtonClick}>Search</button>
            {suggestions.length > 0 && (
                <div className="suggestions">
                    {suggestions.map((suggestion, i) => (
                        <div
                            key={i}
                            className="suggestions__item"
                            onMouseDown={() => handleSuggestionClick(suggestion.description)}
                        >
                            {suggestion.description}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
