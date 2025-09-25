const express = require('express');

const User = require('../models/user');
const validate = require('../middlewares/validation');
const userSchema = require('../schemas/user');

const router = express.Router();

// Show all users
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.render('./users/users', { users });
});

// Show single user
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res
      .status(404)
      .render('404', { message: `No User for this Id ${id}` });
  }

  res.render('./users/userDetails', { user });
});

// Create new user (form submit)
router.post(
  '/',
  validate(userSchema), // then validate
  async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect('/users');
  }
);

// Show edit form
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res
      .status(404)
      .render('404', { message: `No User for this Id ${id}` });
  }

  res.render('./users/editUser', { user });
});

// Update user
router.post('/:id/edit', async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, req.body, { new: true });
  res.redirect('/users');
});

// Delete user
router.post('/:id/delete', async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect('/users');
});

module.exports = router;
