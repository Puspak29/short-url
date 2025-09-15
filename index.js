const express = require('express');
const { connectToDatabase } = require('./connection');
const routes = require('./routers');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const mongoUrl = process.env.MONGO_URI;

app.use(cors());

connectToDatabase(mongoUrl).then(() => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});