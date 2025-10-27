const express = require('express');
const router = express.Router();
const db = require('../config/database');

// @route   POST api/newsletter
// @desc    Subscribe to newsletter
// @access  Public
router.post('/', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: 'Please enter your email' });
  }

  const sql = 'INSERT INTO subscribers (email) VALUES (?)';
  db.run(sql, [email], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
    res.json({ msg: 'Subscribed successfully' });
  });
});

module.exports = router;
