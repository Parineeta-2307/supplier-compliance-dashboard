import React, { useState } from 'react';
import axios from 'axios';

function UploadComplianceForm({ supplierId }) {
  const [metric, setMetric] = useState('');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');
  const [dateRecorded, setDateRecorded] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/compliance', {
        supplier_id: Number(supplierId),
        metric,
        result,
        status,
        date_recorded: dateRecorded,
      });
      setMessage('Compliance data uploaded!');
      setMetric('');
      setResult('');
      setStatus('');
      setDateRecorded('');
    } catch (err) {
      setMessage('Failed to upload compliance data.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 24, background: '#222', padding: 16, borderRadius: 8 }}>
      <h3 style={{ color: '#ffd700' }}>Upload Compliance Data</h3>
      <input
        type="text"
        placeholder="Metric (e.g. Delivery Time)"
        value={metric}
        onChange={e => setMetric(e.target.value)}
        required
        style={{ marginRight: 8 }}
      />
      <input
        type="text"
        placeholder="Result (e.g. 2 days)"
        value={result}
        onChange={e => setResult(e.target.value)}
        required
        style={{ marginRight: 8 }}
      />
      <input
        type="text"
        placeholder="Status (Compliant/Non-Compliant)"
        value={status}
        onChange={e => setStatus(e.target.value)}
        required
        style={{ marginRight: 8 }}
      />
      <input
        type="date"
        value={dateRecorded}
        onChange={e => setDateRecorded(e.target.value)}
        required
        style={{ marginRight: 8 }}
      />
      <button type="submit" style={{ marginLeft: 8 }}>Upload</button>
      {message && <div style={{ color: '#fff', marginTop: 8 }}>{message}</div>}
    </form>
  );
}

export default UploadComplianceForm;
