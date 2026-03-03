const express = require('express');
const cors = require('cors');
const sendResponse = require('./utils/sendResponse');
const authRoutes = require('./modules/auth/auth.routes');
const urlRoutes = require('./modules/url/url.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return sendResponse(res, 200, true, 'Short URL API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

app.use((req, res) => {
    return sendResponse(res, 404, false, 'Route not found');
})

module.exports = app;