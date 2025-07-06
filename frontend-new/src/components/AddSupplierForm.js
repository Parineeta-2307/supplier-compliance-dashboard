import React, { useState } from 'react';

function AddSupplierForm({ onSupplierAdded }) {
  const [form, setForm] = useState({
    name: '',
    country: '',
    duration: '',
    renewal: false,
    compliance_score: '',
    last_audit: '',
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const body = {
      name: form.name,
      country: form.country,
      contract_terms: { duration: form.duration, renewal: form.renewal },
      compliance_score: parseInt(form.compliance_score, 10),
      last_audit: form.last_audit,
    };
    await fetch('http://localhost:8000/api/suppliers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setForm({ name: '', country: '', duration: '', renewal: false, compliance_score: '', last_audit: '' });
    onSupplierAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
      <input name="duration" placeholder="Contract Duration (e.g. 1 year)" value={form.duration} onChange={handleChange} required />
      <label style={{ marginLeft: 8 }}>
        Renewal:
        <input name="renewal" type="checkbox" checked={form.renewal} onChange={handleChange} style={{ marginLeft: 4 }} />
      </label>
      <input name="compliance_score" type="number" placeholder="Compliance Score" value={form.compliance_score} onChange={handleChange} required />
      <input name="last_audit" type="date" placeholder="Last Audit" value={form.last_audit} onChange={handleChange} required />
      <button type="submit">Add Supplier</button>
    </form>
  );
}

export default AddSupplierForm;
