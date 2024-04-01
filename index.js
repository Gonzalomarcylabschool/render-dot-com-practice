const express = require('express');
const app = express();


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

// Endpoints: will define the routes
app.get('/', serveIndex);
app.get('/about', serveAbout);
app.get('/api/hello', serveHello);
app.get('/api/data', serveData);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});