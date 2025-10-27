const express = require('express');
const router = express.Router();
const db = require('../config/contact');

// @route   POST api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ msg: 'Please enter all required fields' });
  }

  const sql = 'INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [name, email, phone, subject, message], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
    res.json({ msg: 'Contact form submitted successfully' });
  });
});

module.exports = router;
