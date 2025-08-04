require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Import routes
const itemsRouter = require('./routes/items');

// Database connection test
const db = require('./db/connection');

//Controllers: will execute the logic of the route
// Request (req), Response (res), Next (sends to the next controller)
// will serve static files from the public folder
const serveIndex = (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
}

// will serve html content
const serveAbout = (req, res, next) => {
  res.send('<h1>About</h1>');
}

// will serve text content
const serveHello = (req, res, next) => {
  const name = req.query.name || 'world';
  res.send(`hello ${name}`);
}

// will server some data
const serveData = (req, res, next) => {
  const data = [{ name: 'ben' }, { name: 'zo' }, { name: 'carmen' }];
  res.send(data);
}

// Database health check
const serveHealth = async (req, res, next) => {
  try {
    await db.raw('SELECT 1');
    res.json({ 
      status: 'healthy', 
      database: 'connected',
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Database health check failed:', error);
    res.status(500).json({ 
      status: 'unhealthy', 
      database: 'disconnected',
      error: error.message 
    });
  }
}

// Endpoints: will define the routes
app.get('/', serveIndex);
app.get('/about', serveAbout);
app.get('/api/hello', serveHello);
app.get('/api/data', serveData);
app.get('/api/health', serveHealth);

// API routes
app.use('/api/items', itemsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${process.env.DB_NAME || 'render_practice_dev'}`);
});