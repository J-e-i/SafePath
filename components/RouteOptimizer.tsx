'use client';

import { useState } from 'react';
import axios from 'axios';

export default function RouteOptimizer({ currentLocation, onRouteSelected }) {
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoute = async () => {
    setLoading(true);
    // Geocode destination to lat/lng
    const geoRes = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`
    );
    if (geoRes.data && geoRes.data.length > 0) {
      const destLat = parseFloat(geoRes.data[0].lat);
      const destLng = parseFloat(geoRes.data[0].lon);
      // Call parent handler with current and destination
      onRouteSelected([
        { lat: currentLocation.lat, lng: currentLocation.lng },
        { lat: destLat, lng: destLng }
      ]);
    } else {
      alert('Destination not found');
    }
    setLoading(false);
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={e => setDestination(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      />
      <button
        onClick={handleRoute}
        disabled={loading}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        {loading ? 'Loading...' : 'Plan Route'}
      </button>
    </div>
  );
}