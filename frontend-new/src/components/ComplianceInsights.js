import React from 'react';
import ReactMarkdown from 'react-markdown';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ComplianceInsights({ insights }) {
  if (!insights) return <Typography color="error">No insights available.</Typography>;

  return (
    <Box sx={{ background: 'rgba(255,255,255,0.07)', borderRadius: 2, p: 3 }}>
      <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
        Compliance Insights
      </Typography>
      <Typography sx={{ color: '#fff' }}>
        <b>Compliance Rate:</b> {insights.compliance_rate ?? '--'}%
        <br />
        <b>Non-Compliant Suppliers:</b> {insights.non_compliant ?? '--'}
        <br />
        <b>Average Compliance Score:</b> {insights.average_score ?? '--'}
        <br />
        <b>Recent Incidents:</b> {insights.recent_incidents ?? '--'}
        <br />
        <b>Expiring Contracts (30d):</b> {insights.expiring_contracts ?? '--'}
      </Typography>
      <Typography sx={{ mt: 2, color: '#ffd700' }}>
        <b>AI Suggestion:</b>
      </Typography>
      <ReactMarkdown
        components={{
          p: ({node, ...props}) => <Typography sx={{ fontStyle: 'italic', mb: 1 }} {...props} />,
          li: ({node, ...props}) => <li style={{ marginBottom: '8px' }} {...props} />,
        }}
      >
        {insights.ai_suggestion || 'No suggestion available.'}
      </ReactMarkdown>
    </Box>
  );
}

export default ComplianceInsights;
