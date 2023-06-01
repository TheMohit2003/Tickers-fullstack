const axios = require('axios');
const Ticker = require('../models/ticker');

async function fetchAndStoreTickers() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');

    const tickersData = response.data;
    const top10Tickers = Object.values(tickersData).slice(0, 10); // Extracting top 10 tickers

    // Storing tickers in the database
    for (const tickerData of top10Tickers) {
      const { name, last, buy, sell, volume, base_unit } = tickerData;

      const ticker = new Ticker({
        name,
        last,
        buy,
        sell,
        volume,
        base_unit
      });

      await ticker.save();
    }

    console.log('Tickers stored in the database successfully.');
  } catch (error) {
    console.error('Error fetching and storing tickers:', error.message);
  }
}

module.exports = {
  fetchAndStoreTickers
};
