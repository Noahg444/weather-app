import React, { useState } from 'react';
import '../styles/LocationInput.css';

const LocationInput = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (location.trim() !== '') {
      onSearch(location);
      setLocation('');
    }
  };

  return (
    <form className="location-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a location (e.g., New York)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default LocationInput;