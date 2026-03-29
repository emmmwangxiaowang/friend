const express = require('express');
const bodyParser = require('body-parser');

const postsRoutes = require('./routes/posts');
const followRoutes = require('./routes/follow');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes
app.use('/', postsRoutes);
app.use('/', followRoutes);

// Simple health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`SoulMate posts service listening on port ${PORT}`);
  });
}
