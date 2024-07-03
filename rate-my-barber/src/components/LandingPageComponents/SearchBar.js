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
        console.log("API Key:", process.env.REACT_APP_API_KEY); // Log the API key
        console.log("Input Value:", value); // Log the input value

        if (value.length === 0) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`/api/maps/api/place/autocomplete/json`, {
                params: {
                    input: value,
                    types: 'establishment',
                    language: 'en',
                    key: process.env.REACT_APP_API_KEY,
                },
            });
            console.log("API Response:", response); // Log the API response

            const results = response.data.predictions.map(prediction => ({
                description: prediction.description,
            }));
            setSuggestions(results);
            console.log("Suggestions:", results); // Log the suggestions
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        console.log("Handle Change Value:", value); // Log the value from handleChange
        setInput(value);
        fetchData(value);
    };

    const handleFocus = () => {
        console.log("Input Focused");
        setInput('');
    };

    const handleBlur = () => {
        console.log("Input Blurred");
        if (input === '') {
            setInput('Where do you want to find a barbershop?');
        }
        // Hide suggestions after a delay to allow onMouseDown event to trigger
        setTimeout(() => setSuggestions([]), 100);
    };

    const handleSuggestionClick = (description) => {
        console.log("Suggestion Clicked:", description);
        setInput(description);
        setSuggestions([]);
        navigate(`/search-results?query=${description}`);
    };

    const handleKeyUp = () => {
        console.log("Key Up Event");
        clearTimeout(timeoutVar);
        timeoutVar = setTimeout(() => {
            fetchData(input);
        }, 1800);
    };

    let timeoutVar;

    const handleKeyDown = () => {
        console.log("Key Down Event");
        clearTimeout(timeoutVar);
    };

    const handleSearchButtonClick = () => {
        console.log("Search Button Clicked");
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
