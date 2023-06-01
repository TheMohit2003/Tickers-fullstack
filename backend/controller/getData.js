const Ticker = require('../models/ticker');

async function getAllTickers(req, res) {
  try {
    const tickers = await Ticker.find();
    res.json(tickers);
  } catch (error) {
    console.error('Error getting tickers:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllTickers
};
