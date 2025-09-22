const orderSchema = require('../validation/order');
const userSchema = require('../validation/user');
const productSchema = require('../validation/product');

const valdiateOrder = (req, res, next) => {
  const data = req.body;

  const isValid = orderSchema(data);
  req.isValid = isValid;
  next();
};

const valdiateUser = (req, res, next) => {
  const data = req.body;

  const isValid = userSchema(data);
  req.isValid = isValid;
  next();
};

const valdiateProduct = (req, res, next) => {
  const data = req.body;

  const isValid = productSchema(data);
  req.isValid = isValid;
  next();
};

module.exports = { valdiateUser, valdiateProduct, valdiateOrder };
