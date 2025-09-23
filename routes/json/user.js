const express = require('express');

const User = require('../models/user');
const validate = require('../middlewares/validation');
const userSchema = require('../schemas/user');

const router = express.Router();

router.post('/', validate(userSchema), async (req, res) => {
  const newUser = new User(req.body);
  const saved = await newUser.save();

  res.status(201).json({ data: saved });
});

router.get('/', async (req, res) => {
  const users = await User.find({});

  res.status(200).json({ data: users, results: users.length });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404).json({ message: `No User for this Id ${id}` });
  }

  res.status(200).json({ data: user });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedUser) {
    res.status(404).json({ message: `No User for this Id ${id}` });
  }

  res.status(200).json({ data: updatedUser });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const userToDelete = await User.findByIdAndDelete(id);

  if (!userToDelete) {
    res.status(404).json({ message: `No User for this Id ${id}` });
  }

  res.status(204).json();
});

module.exports = router;
