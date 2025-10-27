const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRouter = require('./routes/contact');
const newsletterRouter = require('./routes/newsletter');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
