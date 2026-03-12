const express = require('express');
const cors = require('cors');
const sendResponse = require('./utils/sendResponse');
const authRoutes = require('./modules/auth/auth.routes');
const urlRoutes = require('./modules/url/url.routes');
const redirectRoutes = require('./modules/url/redirect.routes');
const requestLogger = require('./middlewares/requestLogger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);
app.use(requestLogger);

app.get('/', (req, res) => {
    return sendResponse(res, 200, true, 'Short URL API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);
app.use('/r', redirectRoutes);

app.use((req, res) => {
    return sendResponse(res, 404, false, 'Route not found');
})

module.exports = app;