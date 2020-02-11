const db = require('./db');
const Media = require('./models/media');
const Annotation = require('./models/annotation');
const Comment = require('./models/comment');

// associations go here


module.exports = { 
  db,
  Media,
  Annotation,
  Comment
};