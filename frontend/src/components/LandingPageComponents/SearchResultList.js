import React from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';
import './SearchResultList.css';

const SearchResultList = ({ results, onClick }) => {
    return (
        <div className="results-list">
            {results.map((result, id) => (
                <SearchResult result={result} key={id} onClick={onClick} />
            ))}
        </div>
    );
};

SearchResultList.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default SearchResultList;
