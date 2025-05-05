const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ApiError = require('./app/utils/error.util');
const MajorRoute = require('./app/router/major.route');
const examGroup = require('./app/router/examGroup.route');

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URI.split(',').map(url => url.trim()),
}));
console.log(`Allow CORS: ${process.env.CLIENT_URI.split(',').map(url => url.trim())}`);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
// app.use('/uploads', express.static(`${__dirname}/uploads`));


//Use Routers
app.use('/api/v1/major', MajorRoute);
app.use('/api/v1/examGroup', examGroup);


//Catch undefined routes
app.use((req, res, next) => {
    next(new ApiError(404, `Không tìm thấy đường dẫn ${req.originalUrl}`));
});


module.exports = app;