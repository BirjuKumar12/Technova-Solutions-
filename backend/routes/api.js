const express = require('express');
const router = express.Router();
const db = require('../config/database');
const emailService = require('../services/emailService');

// Handle Contact Form Submission
router.post('/contact', async (req, res) => {
  const { fullName, email, phone, businessName, serviceType, message } = req.body;

  // Basic Validation
  if (!fullName || !email) {
    return res.status(400).json({ message: 'Full name and email are required.' });
  }

  try {
    // Insert into Database
    const query = 'INSERT INTO contacts (full_name, email, phone, business_name, service_type, message) VALUES (?, ?, ?, ?, ?, ?)';
    await db.promise().execute(query, [fullName, email, phone, businessName, serviceType, message]);

    // Send Email Notification
    await emailService.sendContactNotification({ fullName, email, message });

    res.status(201).json({ message: 'Inquiry submitted successfully!' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
