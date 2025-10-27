const db = require('../config/database');
const emailService = require('../services/emailService');

exports.handleContactForm = async (req, res) => {
  const { fullName, email, phone, businessName, serviceType, message } = req.body;

  // Basic validation
  if (!fullName || !email) {
    return res.status(400).json({ message: 'Full name and email are required.' });
  }

  try {
    // Save to database
    const [result] = await db.promise().query(
      'INSERT INTO contacts (full_name, email, phone, business_name, service_type, message) VALUES (?, ?, ?, ?, ?, ?)',
      [fullName, email, phone, businessName, serviceType, message]
    );

    // Send email notification
    await emailService.sendNewInquiryEmail({ fullName, email, phone, serviceType, message });

    res.status(201).json({ message: 'Inquiry submitted successfully!', inquiryId: result.insertId });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
