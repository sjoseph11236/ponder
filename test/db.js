const Sequelize = require('sequelize');
// const { Media } = require('../server/db/models/media');
// const chalk = require('chalk');

// console.log(chalk.yellow('Opening database connection'));

const db = new Sequelize('postgres://localhost:5432/ponder_tdd_db', {
  logging: false
});


const Media = db.define('media', { 
  title: { 
    type: Sequelize.STRING,
    allowNull: false
  }, 
});

const syncAndSeed = async () => {
  await db.sync({force: true});
  const media = [
    {title: "Coming to America"},
    {title: "American Psycho"},
    {title: "This is America"}
  ]
  const [ medium1, medium2, medium3 ]  = await Promise.all(media.map(medium => Media.create(medium)));


  return {
    media: {
      medium1,
      medium2,
      medium3
    }
  }
};

module.exports = { 
  syncAndSeed
}