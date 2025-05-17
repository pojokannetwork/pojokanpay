require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const app     = express();
const port    = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Import models & auth
const sequelize      = require('./models');
const User           = require('./models/user');
const authRouter     = require('./routes/auth');

// Sync database including User
sequelize.sync().then(() => console.log('Database synced'));

// Auth endpoints
app.use('/api/auth', authRouter);

// ... your existing routes go here ...

app.listen(port, () => console.log(`Server running on port ${port}`));
