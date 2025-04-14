import React, { useState } from 'react';
import '../styles/LocationInput.css'; // Ensure your styling file is in src/styles

const LocationInput = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (location.trim() !== '') {
      // Invoke the callback function passed from App.js with the user's input
      onSearch(location);
      setLocation(''); // Clear the input field after submission
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