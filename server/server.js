const express = require('express');
const morgan = require('morgan');
const path = require('path');
// Create an express instance
const app = express();

// Logging middleware
app.use(morgan('dev'));

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', require('./api'));

// Static middleware
app.use(express.static(path.join(__dirname, '../public')));

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

// 404 
app.use(function(req, res, next) {
  const err = new Error('not found.');
  err.status = 404; 
  next(err);
});

// 500
app.use((err, req, res) => {
  console.error('This is the error from server.js ', err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal servers error ');
});

module.exports = app;