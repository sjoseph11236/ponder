const router = require('express').Router();
const axios = require('axios');
const API_TOKEN = process.env.API_TOKEN || require('../../secret');

// Movie Clip Channel ID: 
const channelID = 'UC2pmfLm7iq6Ov1UwYrWYkZA';
const type = 'search';
const q = 'kendrick';
const max = 50;

app.get('/movies', async (req, res, next) => { 

});

module.exports = router;