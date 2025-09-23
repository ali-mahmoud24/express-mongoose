const path = require('path');
const express = require('express');

const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('json spaces', 2);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

// 404 handler (for all other routes)
app.use('*not', (req, res) => {
  res.status(404).render('404', { message: 'Resource not found' });
});

module.exports = app;
