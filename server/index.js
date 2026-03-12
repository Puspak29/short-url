const app = require('./src/app');
const { PORT } = require('./src/config/env');
const connectDB = require('./src/config/db');
const logger = require('./src/utils/logger');

connectDB();

app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Server is running on port ${PORT}`);
});