import React from 'react';
import { Paper, Typography } from '@mui/material';

interface KeyRatiosProps {
  data: {
    marketCap: number;
    sharesOutstanding: number;
    peRatio: number;
    psRatio: number;
    pbRatio: number;
    pegRatio: number;
    currentRatio: number;
    debtToEquityRatio: number;
    eps: number;
  };
}

const KeyRatios: React.FC<KeyRatiosProps> = ({ data }) => (
  <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
    <Typography variant="h2" gutterBottom>
      Key Ratios
    </Typography>
    <Typography>Market Cap: {data.marketCap}</Typography>
    <Typography>Shares Outstanding: {data.sharesOutstanding}</Typography>
    <Typography>P/E Ratio: {data.peRatio}</Typography>
    <Typography>P/S Ratio: {data.psRatio}</Typography>
    <Typography>P/B Ratio: {data.pbRatio}</Typography>
    <Typography>PEG Ratio: {data.pegRatio}</Typography>
    <Typography>Current Ratio: {data.currentRatio}</Typography>
    <Typography>Debt to Equity Ratio: {data.debtToEquityRatio}</Typography>
    <Typography>EPS: {data.eps}</Typography>
  </Paper>
);

export default KeyRatios;
