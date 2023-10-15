const express = require('express');
const { User } = require('./user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./auth.middleware');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ msg: 'User with the same email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ name, email, password: hashedPassword });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ msg: 'User with this email does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id }, 'your_secret_key'); // Replace with your secret key
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/tokenIsValid', authMiddleware, (req, res) => {
  res.json({ valid: true, user: req.user });
});

module.exports = router;
