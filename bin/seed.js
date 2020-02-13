const { db, Media, Tag } = require('../server/db');
const {green, red} = require('chalk')

const media = [
  {
    title: "Coming to America", 
    artist: "John Landis", 
    description: "Prince Akeem (Eddie Murphy) is the prince of a wealthy African country and wants for nothing, except a wife who will love him in spite of his title. To escape an arranged marriage, Akeem flees to America accompanied by his persnickety sidekick, Semmi (Arsenio Hall), to find his queen. Disguised as a foreign student working in fast food, he romances Lisa (Shari Headley), but struggles with revealing his true identity to her and his marital intentions to his king father (James Earl Jones).",
    url: "https://www.youtube.com/embed/IZQFJ6hZNJc",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/38/ComingtoAmerica1988MoviePoster.jpg/220px-ComingtoAmerica1988MoviePoster.jpg"
  },
  {
    title: "This is America", 
    artist: "Donald Glover", 
    description: "A song by American rapper Donald Glover, under his musical stage name Childish Gambino. Written by Glover, Ludwig Göransson, and Jeffery Lamar Williams, and produced by Glover and Göransson, it was released on May 5, 2018, at the same time that Gambino was hosting an episode of Saturday Night Live. The song features background vocals by American rappers Young Thug (who also has writing credit as Williams), Slim Jxmmi of Rae Sremmurd, BlocBoy JB, Quavo of Migos, and 21 Savage. The song addresses the wider issue of gun violence in the United States, the high rate of mass shootings in the United States, along with longstanding racism and discrimination against African Americans.",
    url: "https://www.youtube.com/embed/VYOjWnS4cMY",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/This_Is_America_%28single_cover%29_2018.jpg/220px-This_Is_America_%28single_cover%29_2018.jpg"
  },
  
]

const tags = [
  {word: 'America'},
  {word: 'violence'},
  {word: 'discrimination'}
];


const seed = async() => {
  await db.sync({force: true});

  await Promise.all(media.map(medium => {
    return Media.create(medium);
  }));

  await Promise.all(tags.map(tag => {
    return Tag.create(tag);
  }));

  console.log(green('Seeding success!'));
  db.close();
}

seed()
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'));
    console.error(err);
    db.close();
  });