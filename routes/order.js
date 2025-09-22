const express = require('express');

const Order = require('../models/order');

const { valdiateOrder } = require('../middlewares/validation');

const router = express.Router();

const validate = router.post('/', valdiateOrder, async (req, res) => {
  console.log( valdiateOrder.errors);
  if (!req.isValid) {
    return res.status(400).json({ errors: valdiateOrder.errors });
  }
  const newOrder = new Order(req.body);
  const saved = await newOrder.save();

  res.status(201).json({ data: saved });
});

router.get('/', async (req, res) => {
  const orders = await Order.find({}).populate('products');

  res.status(200).json({ data: orders, results: orders.length });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate('products');

  if (!order) {
    res.status(404).json({ message: `No Order for this Id ${id}` });
  }

  res.status(200).json({ data: document });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const updatedUser = await Order.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedUser) {
    res.status(404).json({ message: `No User for this Id ${id}` });
  }

  res.status(200).json({ data: updatedUser });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const orderToDelete = await Order.findByIdAndDelete(id);

  if (!orderToDelete) {
    res.status(404).json({ message: `No Order for this Id ${id}` });
  }

  res.status(204).json();
});

module.exports = router;
