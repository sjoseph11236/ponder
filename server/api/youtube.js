const router = require('express').Router();
const axios = require('axios');
const { Media, Tag } = require('../db');
const API = process.env.API_TOKEN || require('../../secret');

// Max Results: 
const max = 50;

// Need this link + videoId
// https://www.youtube.com/embed/

// /api/youtube/movies/:q
router.get('/movies/:word', async (req, res, next) => { 
  try {
    // Movie Clip Channel ID: 
    const channelID = 'UC3gNmTGu-TTbFPpfSs5kNkg';
    const q = req.params.word;
    const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&maxResults=${max}&q=${q}&type=video&videoEmbeddable=true&key=${API}`;
    const { data } = await axios.get(URL);

    if(data.items.length) { 
  
      const tag = await Tag.create({word: req.params.word});

      const formatedData = Media.formatYoutubeData(data.items, 'movie');
  
      await Promise.all(formatedData.map(async music => {
        const storedMusic = await Media.create(music);
        // const storedMediaTag = await
        // return Media.create(music);
        return storedMusic;
      }));
    res.json(formatedData);
    }
    else { 
      res.status(404).send('Try a new word')
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// /api/youtube/music/:q
router.get('/music/:q', async (req, res, next) => { 
  try {
    const channelID = 'UC2pmfLm7iq6Ov1UwYrWYkZA';
    const q = req.params.q;
    const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&maxResults=${max}&q=${q}&type=video&videoEmbeddable=true&key=${API}`;
    const { data } = await axios.get(URL);
    const formatedData = Media.formatYoutubeData(data.items, 'music');
    await Promise.all(formatedData.map(music => {
      return Media.create(music);
    }));
    res.json(formatedData);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;