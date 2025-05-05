const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ApiError = require('./app/utils/error.util');

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URI.split(',').map(url => url.trim()),
}));
console.log(`Allow CORS: ${process.env.CLIENT_URI.split(',').map(url => url.trim())}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
// app.use('/uploads', express.static(`${__dirname}/uploads`));


//Use Routers
app.use('/api/v1', require('./app/routes/index'));


//handle Errors


module.exports = app;