const express = require('express');
const {fetchAndStoreTickers }= require('./controller/fetchAndStoreTickers');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

app.use(express.json());
app.use(cors());


app.use('/',require('./routes/tickerRoutes'));

app.listen(PORT , ()=>{
    console.log(`the port is running on ${PORT}`)
    fetchAndStoreTickers();
})