const express = require('express');
const { connectToDatabase } = require('./connection');
const routes = require('./routers');
const cors = require('cors');
const cookies = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const mongoUrl = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cookies());

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

connectToDatabase(mongoUrl).then(() => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});