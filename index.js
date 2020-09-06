const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const { db } = require('./config/db');

db();

const { router } = require('./routes');

const { errorHandler } = require('./middleware/error');

const app = express();

// app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT);

module.exports = { app };
