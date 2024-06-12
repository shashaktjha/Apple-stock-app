import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = 'your_alpha_vantage_api_key'; // Replace with your actual Alpha Vantage API key
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Fetch candlestick data
export const getCandlestickData = async (symbol: string) => {
  console.log(`Fetching candlestick data for ${symbol} with API key ${ALPHA_VANTAGE_API_KEY}`);
  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: symbol,
        outputsize: 'compact',
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    console.log('Full API Response:', response.data);

    const timeSeries = response.data['Time Series (Daily)'];
    if (!timeSeries) {
      console.error('Invalid API response structure:', response.data);
      throw new Error('Invalid API response');
    }

    const candlestickData = Object.keys(timeSeries).map((date) => {
      const dailyData = timeSeries[date];
      return {
        x: new Date(date).getTime(),
        open: parseFloat(dailyData['1. open']),
        high: parseFloat(dailyData['2. high']),
        low: parseFloat(dailyData['3. low']),
        close: parseFloat(dailyData['4. close']),
      };
    });

    console.log('Formatted Candlestick Data:', candlestickData);

    return candlestickData;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching candlestick data:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error fetching candlestick data:', error);
    }
    throw new Error('Failed to fetch candlestick data');
  }
};

// Fetch real-time price
export const getRealTimePrice = async (symbol: string) => {
  console.log(`Fetching real-time price for ${symbol} with API key ${ALPHA_VANTAGE_API_KEY}`);
  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    console.log('Full API Response:', response.data);

    const data = response.data['Global Quote'];
    if (!data) {
      console.error('Invalid API response structure:', response.data);
      throw new Error('Invalid API response');
    }

    return parseFloat(data['05. price']);
  } catch (error: any) {
    console.error('Error fetching real-time price:', error.response?.data || error.message);
    throw new Error('Failed to fetch real-time price');
  }
};

// Fetch financial ratios
export const getKeyRatios = async (symbol: string) => {
  console.log(`Fetching key ratios for ${symbol} with API key ${ALPHA_VANTAGE_API_KEY}`);
  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol: symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    console.log('Full API Response:', response.data);

    const data = response.data;
    if (!data) {
      console.error('Invalid API response structure:', response.data);
      throw new Error('Invalid API response');
    }

    return {
      marketCap: parseFloat(data.MarketCapitalization),
      sharesOutstanding: parseFloat(data.SharesOutstanding),
      peRatio: parseFloat(data.PERatio),
      psRatio: parseFloat(data.PriceToSalesRatioTTM),
      pbRatio: parseFloat(data.PriceToBookRatio),
      pegRatio: parseFloat(data.PEGRatio),
      currentRatio: parseFloat(data.CurrentRatio),
      debtToEquityRatio: parseFloat(data.DebtEquityRatio),
      eps: parseFloat(data.EPS),
    };
  } catch (error: any) {
    console.error('Error fetching key ratios:', error.response?.data || error.message);
    throw new Error('Failed to fetch key ratios');
  }
};

export const getAnalystEstimates = async (symbol: string) => {
  console.log(`Fetching analyst estimates for ${symbol}`);
  try {
    // Dummy data as Alpha Vantage does not provide analyst estimates directly
    return {
      "BofA": 7.5,
      "Citibank": 6.5,
      "Goldman Sachs": 7.9,
      "Morgan Stanley": 9.87,
      "J.P. Morgan": 8.4,
      "Moelis": 6.9,
      "Lazard": 7.1,
      "Evercore": 7.8
    };
  } catch (error: any) {
    console.error('Error fetching analyst estimates:', error.response?.data || error.message);
    throw new Error('Failed to fetch analyst estimates');
  }
};
