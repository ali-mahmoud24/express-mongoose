const express = require('express');

const Product = require('../models/product');

const router = express.Router();

router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();

  res.status(201).json({ data: saved });
});

router.get('/', async (req, res) => {
  const products = await Product.find({});

  res.status(200).json({ data: products, results: products.length });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404).json({ message: `No Product for this Id ${id}` });
  }

  res.status(200).json({ data: product });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedProduct) {
    res.status(404).json({ message: `No Product for this Id ${id}` });
  }

  res.status(200).json({ data: updatedProduct ,});
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const productToDelete = await Product.findByIdAndDelete(id);

  if (!productToDelete) {
    res.status(404).json({ message: `No Product for this Id ${id}` });
  }

  res.status(204).json();
});

module.exports = router;
