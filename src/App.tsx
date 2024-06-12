import React, { useEffect, useState } from 'react';
import { getKeyRatios, getRealTimePrice, getCandlestickData, getAnalystEstimates } from './services/alphaVantageService';
import KeyRatios from './components/KeyRatios';
import AnalystEstimates from './components/AnalystEstimates';
import CandlestickChart from './components/CandlestickChart';
import { Container, Typography, Paper, AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: pink[500],
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

const App: React.FC = () => {
  const [keyRatios, setKeyRatios] = useState<any>(null);
  const [analystEstimates, setAnalystEstimates] = useState<any>(null);
  const [candlestickData, setCandlestickData] = useState<any>(null);
  const [realTimePrice, setRealTimePrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const keyRatios = await getKeyRatios('AAPL');
        const analystEstimates = await getAnalystEstimates('AAPL');
        const candlestickData = await getCandlestickData('AAPL');
        const realTimePrice = await getRealTimePrice('AAPL');
        console.log('Fetched key ratios:', keyRatios);
        console.log('Fetched analyst estimates:', analystEstimates);
        console.log('Fetched candlestick data:', candlestickData);
        console.log('Fetched real-time price:', realTimePrice);
        setKeyRatios(keyRatios);
        setAnalystEstimates(analystEstimates);
        setCandlestickData(candlestickData);
        setRealTimePrice(realTimePrice);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(`Failed to fetch data: ${error.message}`);
      }
    };
    fetchData();
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!keyRatios || !analystEstimates || !candlestickData || realTimePrice === null) return <Typography>Loading...</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stock Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h1" gutterBottom>
          Apple Stock Information
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h2">
            Real-Time Price: ${realTimePrice}
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <CandlestickChart data={candlestickData} />
        </Paper>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <KeyRatios data={keyRatios} />
        </Paper>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <AnalystEstimates data={analystEstimates} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
