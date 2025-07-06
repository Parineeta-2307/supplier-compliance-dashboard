import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WeatherImpactForm from '../components/WeatherImpactForm';
import UploadComplianceForm from '../components/UploadComplianceForm';

function SupplierDetail() {
  const navigate = useNavigate();
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState(undefined);
  const [complianceRecords, setComplianceRecords] = useState([]);
  const [error, setError] = useState('');

  // Fetch supplier details and compliance records
  const fetchSupplier = () => {
    axios.get(`http://localhost:8000/api/suppliers/${supplierId}`)
      .then(res => setSupplier(res.data))
      .catch(() => {
        setSupplier(null);
        setError('Failed to load supplier details.');
      });
  };

  const fetchComplianceRecords = () => {
    axios.get(`http://localhost:8000/api/suppliers/${supplierId}/compliance`)
      .then(res => setComplianceRecords(res.data))
      .catch(() => setComplianceRecords([]));
  };

  useEffect(() => {
    if (!supplierId) {
      setSupplier(null);
      setComplianceRecords([]);
      return;
    }
    fetchSupplier();
    fetchComplianceRecords();
    // eslint-disable-next-line
  }, [supplierId]);

  if (supplier === undefined) return <div>Loading supplier details...</div>;
  if (supplier === null) return <div>Supplier not found or failed to load.</div>;

  return (
    <div>
      <button
        style={{
          marginBottom: 16,
          padding: '8px 16px',
          background: '#222',
          color: '#ffd700',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
        onClick={() => navigate('/suppliers')}
      >
        ← Back to Suppliers
      </button>
      <h2>Supplier Details</h2>
      <div>
        <strong>Name:</strong> {supplier.name}<br />
        <strong>Country:</strong> {supplier.country}<br />
        <strong>Compliance Score:</strong> {supplier.compliance_score}<br />
        <strong>Contract Duration:</strong> {supplier.contract_terms?.duration || '--'}<br />
        <strong>Renewal:</strong> {supplier.contract_terms?.renewal ? 'Yes' : 'No'}<br />
        <strong>Last Audit:</strong> {supplier.last_audit}<br />
      </div>

      <h3 style={{ marginTop: 32 }}>Compliance Records</h3>
      {complianceRecords.length === 0 ? (
        <div>No compliance records found.</div>
      ) : (
        <table style={{ width: '100%', marginBottom: 24, borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Metric</th>
      <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Result</th>
      <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Status</th>
      <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Date Recorded</th>
    </tr>
  </thead>
  <tbody>
    {complianceRecords.map((record, idx) => (
      <tr key={idx}>
        <td style={{ padding: '8px' }}>{record.metric}</td>
        <td style={{ padding: '8px' }}>{record.result}</td>
        <td style={{ padding: '8px' }}>{record.status}</td>
        <td style={{ padding: '8px' }}>{record.date_recorded}</td>
      </tr>
    ))}
  </tbody>
</table>

      )}

      {/* Pass fetchComplianceRecords as a callback to refresh records after upload */}
      <UploadComplianceForm supplierId={supplierId} onUploaded={fetchComplianceRecords} />
      <WeatherImpactForm supplierId={supplierId} />
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
}

export default SupplierDetail;
