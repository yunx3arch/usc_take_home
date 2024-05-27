const express = require('express');
const router = express.Router();
const { protect } = require('./auth-middleware'); 

router.get('/dashboard', protect, (req, res) => {
  res.json({ message: 'Welcome to the protected page', user: req.user });
});

module.exports = router;
