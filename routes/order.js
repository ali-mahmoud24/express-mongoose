const express = require('express');
const Order = require('../models/order');
const Product = require('../models/product');
const validate = require('../middlewares/validation');
const orderSchema = require('../schemas/order');

const router = express.Router();

// Middleware to calculate total price
const calculateOrderTotalPrice = async (req, res, next) => {
  const products = await Product.find({ _id: { $in: req.body.products } });
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  req.body.totalPrice = totalPrice;
  next();
};

// Show all orders
router.get('/', async (req, res) => {
  const orders = await Order.find({}).populate('user').populate('products');

  res.render('./orders/orders', { orders });
});

// Show single order
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate('user').populate('products');

  if (!order) {
    return res
      .status(404)
      .render('404', { message: `No Order for this Id ${id}` });
  }

  res.render('./orders/orderDetails', { order });
});

// Create new order
router.post(
  '/',
  validate(orderSchema),
  calculateOrderTotalPrice,
  async (req, res) => {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.redirect('/orders');
  }
);

// Show edit form
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate('products');

  if (!order) {
    return res
      .status(404)
      .render('404', { message: `No Order for this Id ${id}` });
  }

  const products = await Product.find({});
  res.render('./orders/editOrder', { order, products });
});

// Update order
router.post('/:id/edit', calculateOrderTotalPrice, async (req, res) => {
  const { id } = req.params;
  await Order.findByIdAndUpdate(id, req.body, { new: true });
  res.redirect('/orders');
});

// Delete order
router.post('/:id/delete', async (req, res) => {
  const { id } = req.params;
  await Order.findByIdAndDelete(id);
  res.redirect('/orders');
});

module.exports = router;
