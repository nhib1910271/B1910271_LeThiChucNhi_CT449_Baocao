const express = require('express');
const cors = require('cors')

const tourRoute = require('./routes/tourRoute')
const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')

const {errorHandler} = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tour', tourRoute);
app.use('/api/auth', userRoute);
app.use('/api/order', orderRoute);

app.all('*', (req, res, next) => {
    const err = new Error('The route can be not found');
    err.statusCode = 404;
    next(err);
})

app.use(errorHandler);

module.exports = app;
