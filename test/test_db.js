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
    allowNull: false,
    validate: { 
      notEmpty: true
    }
  }, 
  artist: { 
    type: Sequelize.STRING,
    allowNull: false,
    validate: { 
      notEmpty: true
    }
  }, 
});

const media = [
  { title: "Coming to America",
    artist: "John Landis", 
  },
  { title: "American Psycho",
    artist: "Mary Harron",
  },
  { title: "This is America",
    artist: "Donald Glover", 
  },
  { title: "Us",
    artist: "Jordan Peele", 
  },
]

const syncAndSeed = async () => {
  await db.sync({force: true});

  const [ medium1, medium2, medium3, medium4 ]  = await Promise.all(media.map(medium => Media.create(medium)));


  return {
    media: {
      medium1,
      medium2,
      medium3,
      medium4    
    }
  }

  console.log(green('Seeding success!'));
  db.close();
};

module.exports = { 
  syncAndSeed
}