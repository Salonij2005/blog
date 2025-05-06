const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const Note = require('./models/Note');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Ignore favicon requests
app.use((req, res, next) => {
  if (req.originalUrl.includes('favicon.ico')) {
    return res.status(204).end();
  }
  next();
});

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const postsRouter = require('./routes/posts');
app.use('/', postsRouter);
app.use('/posts', postsRouter);

// New route to handle note form submission
app.post('/notes', async (req, res) => {
  try {
    const { name, contact, message } = req.body;
    const newNote = new Note({ name, contact, message });
    await newNote.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// Here are deployment instructions for your current project setup without requiring any code changes:

// Your project uses a local MongoDB connection string (mongodb://localhost:27017/blogDB). To deploy on a free hosting platform, you need to:

// Deploy your MongoDB database separately on a cloud service like MongoDB Atlas (free tier).
// Update the MongoDB connection string in your app.js manually after deployment to point to the cloud MongoDB URI.
// Choose a free hosting platform that supports Node.js apps, such as:

// Heroku (https://www.heroku.com/)
// Render (https://render.com/)
// Railway (https://railway.app/)
// Push your project code to a GitHub repository if not already done.

// Deploy on the chosen platform:

// For Heroku:
// Create a Heroku account and install the Heroku CLI.
// Run heroku create your-app-name in your project directory.
// Run git push heroku main to deploy.
// Use heroku open to open your app.
// Use heroku config:set MONGODB_URI="your-cloud-mongodb-uri" to set the MongoDB URI environment variable.
// Manually update your app.js to use this environment variable or redeploy with the updated connection string.
// Since your current app.js uses a hardcoded MongoDB URI, you will need to update it manually to the cloud URI after deployment or modify the code to use environment variables for easier management.

// Your app listens on the port provided by the environment variable PORT or defaults to 3000, which is compatible with most hosting platforms.

// Static files and views are correctly configured and will be served as expected.

// If you want, I can help you with detailed step-by-step commands for deploying on a specific platform like Heroku.