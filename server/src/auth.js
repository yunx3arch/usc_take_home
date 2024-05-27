const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./models');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('reqbody', req.body);
  try {
    console.log(username,password);
    const user = await db.User.create({ username, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
