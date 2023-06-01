const express = require('express');
const {getAllTickers} = require('../controller/getData');

const router = express.Router();

router.get('/tickers', getAllTickers);

module.exports = router;
