const Sequelize = require('sequelize');
// const { Media } = require('../server/db/models/media');
const chalk = require('chalk');
const {green, red,  yellow} = require('chalk')
console.log(yellow('Opening database connection'));

const db = new Sequelize('postgres://localhost:5432/ponder_tdd_db', {
  logging: false
});


const Media = db.define('media', { 
  title: { 
    type: Sequelize.STRING,
    allowNull: false
  }, 
});

const media = [
  {title: "Coming to America"},
  {title: "American Psycho"},
  {title: "This is America"},
  {title: "Us"},
]

const syncAndSeed = async () => {
  await db.sync({force: true});

  const [ medium1, medium2, medium3, medium4 ]  = await Promise.all(media.map(medium => Media.create(medium)));

  console.log(green('Seeding success!'));
  db.close();
  return {
    media: {
      medium1,
      medium2,
      medium3,
      medium4    
    }
  }



};

module.exports = { 
  syncAndSeed
}