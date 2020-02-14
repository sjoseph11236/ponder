const db = require('./db');
const Media = require('./models/media');
const Annotation = require('./models/annotation');
const Comment = require('./models/comment');
const Tag = require('./models/tag');
const Combo = require('./models/combo');
const Feed = require('./models/feed');

// associations go here
Media.belongsToMany(Media, {as: 'pair', through: Combo});
Annotation.belongsToMany(Combo, { through: Feed});
Tag.belongsToMany(Media, {through: 'mediaTag'});

Annotation.hasMany(Comment);
Comment.belongsTo(Annotation);

module.exports = { 
  db,
  Media,
  Annotation,
  Comment,
  Combo,
  Tag, 
  Feed
};