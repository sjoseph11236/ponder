const router = require('express').Router();
const axios = require('axios');
const API = process.env.API_TOKEN || require('../../secret');

// Max Results: 
const max = 50;

router.get('/movies/:q', async (req, res, next) => { 
  try {
    // Movie Clip Channel ID: 
    const channelID = 'UC3gNmTGu-TTbFPpfSs5kNkg';
    const q = req.params.q;
    const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&maxResults=${max}&q=${q}&type=video&key=${API}`;
    const { data } = await axios.get(URL);
    res.json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.get('/music/:q', async (req, res, next) => { 
  try {
    const q = req.params.q;
    const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${max}&q=${q}&type=video&key=${API}`;
    const { data } = await axios.get(URL);
    res.json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;