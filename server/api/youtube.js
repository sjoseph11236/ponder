const router = require('express').Router();
const axios = require('axios');
const { Media, Tag, MediaTag } = require('../db');
const API = process.env.API_TOKEN || require('../../secret');

// Max Results: 
const max = 2;

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
      // Find or Create Tag in Database
      const [ tag ] = await Tag.findOrCreate({
        where: {
          word: req.params.word
        }
      });

      // Format the youtube Data
      const formatedData = Media.formatYoutubeData(data.items, 'movie');
  
      // Store the formated Data with associated Tag
      await Promise.all(formatedData.map(async movie => {
        const [ storedMovie ] = await Media.findOrCreate({
          where: { 
            title: movie.title,
            artist: movie.artist,
            description: movie.description,
            url: movie.url, 
            imageUrl: movie.imageUrl,
            type: movie.type
          }
        });

        // Associate each media with tag. 
        await MediaTag.findOrCreate({ 
          where: { 
            mediumId: storedMovie.id, 
            tagId: tag.id
          }
        });

        return storedMovie;
      }));
      console.log("formatedData", formatedData)    
      res.send(formatedData);
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
router.get('/music/:word', async (req, res, next) => { 
  try {
    const channelID = 'UC2pmfLm7iq6Ov1UwYrWYkZA';
    const q = req.params.word;
    const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&maxResults=${max}&q=${q}&type=video&videoEmbeddable=true&key=${API}`;
    const { data } = await axios.get(URL);

    if(data.items.length) {
      // Find or Create Tag in Database
      const [ tag ]= await Tag.findOrCreate({
        where: {
          word: req.params.word
        }
      });

      // Format the youtube Data
      const formatedData = Media.formatYoutubeData(data.items, 'music');

      // Store the formated Data with associated Tag
      await Promise.all(formatedData.map(async music => {
        const [ storedMusic ] = await Media.findOrCreate({
          where: { 
            title: music.title,
            artist: music.artist,
            description: music.description,
            url: music.url, 
            imageUrl: music.imageUrl,
            type: music.type
          }
        });

        // Associate each media with tag. 
        await MediaTag.findOrCreate({ 
          where: { 
            mediumId: storedMusic.id, 
            tagId: tag.id
          }
        });

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

module.exports = router;