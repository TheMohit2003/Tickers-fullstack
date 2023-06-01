const axios = require('axios');

async function fetchTickers() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickersData = response.data;
    const top10Tickers = tickersData.slice(0, 10); // Extracting top 10 tickers

    return top10Tickers;
  } catch (error) {
    console.error('Error fetching tickers:', error.message);
    throw error;
  }
}

module.exports = {
  fetchTickers
};
