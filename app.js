const express = require('express');

const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');

const app = express();

app.set('json spaces', 2);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// app.use('*not', (req, res) =>
//   res.status(404).json({ message: 'Resource not found' })
// );

module.exports = app;
