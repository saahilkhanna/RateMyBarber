import React, { useState } from 'react';
import PlacesAutocomplete, {geocodeByAddress, geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';
import './SearchBar.css';

const SearchBar = ({ setAddress, setCoordinates }) => {
    const [address, setAddressState] = useState('');

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0]);
        console.log(ll);
        setAddressState(value);
        setAddress(value);
        setCoordinates(ll);
    };

    const handleGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                    const results = await geocodeByPlaceId({
                        lat: latitude,
                        lng: longitude,
                    });
                    const address = results[0].formatted_address;
                    setAddressState(address);
                    setAddress(address);
                    setCoordinates({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error fetching geolocation', error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className="search-bar">
            <button onClick={handleGeolocation}>Use Current Location</button>
            <PlacesAutocomplete
                value={address}
                onChange={(val) => setAddressState(val)}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                    ? 'suggestion-item suggestion-item--active'
                                    : 'suggestion-item';
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    );
};

export default SearchBar;

