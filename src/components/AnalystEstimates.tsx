import React from 'react';
import { Paper, Typography } from '@mui/material';

interface AnalystEstimatesProps {
  data: {
    [key: string]: number;
  };
}

const AnalystEstimates: React.FC<AnalystEstimatesProps> = ({ data }) => (
  <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
    <Typography variant="h2" gutterBottom>
      Analyst Estimates
    </Typography>
    {Object.entries(data).map(([analyst, estimate]) => (
      <Typography key={analyst}>
        {analyst}: {estimate}
      </Typography>
    ))}
  </Paper>
);

export default AnalystEstimates;
