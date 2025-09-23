const express = require('express');
const Product = require('../models/product');
const validate = require('../middlewares/validation');
const productSchema = require('../schemas/product');

const router = express.Router();

// Show all products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.render('products', { products });
});

// Show single product
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res
      .status(404)
      .render('404', { message: `No Product for this Id ${id}` });
  }

  res.render('productDetails', { product });
});

// Add new product (form submit)
router.post('/', validate(productSchema), async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect('/products');
});

// Show edit form
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res
      .status(404)
      .render('404', { message: `No Product for this Id ${id}` });
  }

  res.render('editProduct', { product });
});

// Update product
router.post('/:id/edit', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.redirect('/products');
});

// Delete product
router.post('/:id/delete', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

module.exports = router;
