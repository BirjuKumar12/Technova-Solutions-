const db = require('../config/database');

exports.handleNewsletterSubscription = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    await db.promise().query('INSERT INTO subscribers (email) VALUES (?)', [email]);
    res.status(201).json({ message: 'Subscription successful!' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email is already subscribed.' });
    }
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
