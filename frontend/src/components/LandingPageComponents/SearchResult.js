import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResult.css';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    // Fetch results based on the query if needed
    // For simplicity, assume results are already fetched and passed as props or use a context/store

    return (
        <div className="search-results">
            <h1>Search Results for "{query}"</h1>
            {/* Render your search results here */}
        </div>
    );
};

export default SearchResults;
