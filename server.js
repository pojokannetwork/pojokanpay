
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();
const sequelize = require('./config/database');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend'));

// Routes
app.use('/api/settings', require('./routes/settings'));
app.use('/api/whatsapp', require('./routes/whatsapp_route'));
app.use('/api/mobile', require('./routes/mobile_api_route'));

// DB sync
sequelize.sync().then(() => {
    console.log('Database connected and synced.');
});

// Start server
app.listen(port, () => {
    console.log(`PojokanPay running at http://localhost:${port}`);
});
