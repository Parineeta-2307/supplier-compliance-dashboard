import React, { useState } from 'react';
import axios from 'axios';

function WeatherImpactForm({ supplierId }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [result, setResult] = useState(null);

  const handleCheckWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/suppliers/check-weather-impact', {
        supplier_id: Number(supplierId),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        delivery_date: deliveryDate,
      });
      setResult(response.data);
    } catch (err) {
      setResult({ error: 'Failed to check weather impact' });
    }
  };

  return (
    <div style={{ marginTop: 24, padding: 16, background: '#222', borderRadius: 8 }}>
      <h3 style={{ color: '#ffd700' }}>Check Weather Impact</h3>
      <form onSubmit={handleCheckWeather}>
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
          required
        />
        <input
          type="date"
          value={deliveryDate}
          onChange={e => setDeliveryDate(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: 8 }}>Check Weather</button>
      </form>
      {result && (
        <div style={{ color: '#fff', marginTop: 12 }}>
          <strong>Result:</strong>
          <pre style={{ background: '#111', padding: 8, borderRadius: 4 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default WeatherImpactForm;
