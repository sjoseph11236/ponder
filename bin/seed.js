const { db, Media, Tag, Annotation } = require('../server/db');
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
  {
    title: "Us", 
    artist: "Jordan Peele", 
    description: "Accompanied by her husband, son and daughter, Adelaide Wilson returns to the beachfront home where she grew up as a child. Haunted by a traumatic experience from the past, Adelaide grows increasingly concerned that something bad is going to happen. Her worst fears soon become a reality when four masked strangers descend upon the house, forcing the Wilsons into a fight for survival. When the masks come off, the family is horrified to learn that each attacker takes the appearance of one of them.",
    url: "https://www.youtube.com/embed/vh7_WKODlE8",
    imageUrl: "http://t2.gstatic.com/images?q=tbn:ANd9GcRsuQJNsOm5Gt-apl6_1KSYupoMvgA9R2kl5ZEKIixEJ_HVQ62d"
  },
  {
    title: "American Psycho", 
    artist: "Mary Harron", 
    description: "The movie American Psycho is set in New York City in 1987, a handsome, young urban professional, Patrick Bateman (Christian Bale), lives a second life as a gruesome serial killer by night. The cast is filled by the detective (Willem Dafoe), the fiance (Reese Witherspoon), the mistress (Samantha Mathis), the coworker (Jared Leto), and the secretary (Chloë Sevigny). This is a biting, wry comedy examining the elements that make a man a monster.",
    url: "https://www.youtube.com/embed/RjKNbfA64EE",
    imageUrl: "https://www.gstatic.com/tv/thumb/v22vodart/24116/p24116_v_v8_ax.jpg"
  },
  
]

const tags = [
  {word: 'America'},
  {word: 'violence'},
  {word: 'discrimination'}
];

const annotations = [
  {
    info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quas ex architecto officia minus? Praesentium sequi tempore, est commodi veritatis laborum provident illum sapiente veniam minima ex, exercitationem distinctio doloremque?Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem id fugit voluptatem, consequatur error laboriosam in expedita recusandae labore nesciunt omnis tempore aliquam porro dolores ad voluptates assumenda voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magnam voluptatum aut nobis nostrum ea pariatur dolorem, ex beatae officiis sit fuga soluta hic fugit repellat tempora cupiditate assumenda debitis.',
    date: new Date()
  },
  {
    info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quas ex architecto officia minus? Praesentium sequi tempore, est commodi veritatis laborum provident illum sapiente veniam minima ex, exercitationem distinctio doloremque?Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem id fugit voluptatem, consequatur error laboriosam in expedita recusandae labore nesciunt omnis tempore aliquam porro dolores ad voluptates assumenda voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magnam voluptatum aut nobis nostrum ea pariatur dolorem, ex beatae officiis sit fuga soluta hic fugit repellat tempora cupiditate assumenda debitis.',
    date: new Date()
  },
  {
    info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quas ex architecto officia minus? Praesentium sequi tempore, est commodi veritatis laborum provident illum sapiente veniam minima ex, exercitationem distinctio doloremque?Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem id fugit voluptatem, consequatur error laboriosam in expedita recusandae labore nesciunt omnis tempore aliquam porro dolores ad voluptates assumenda voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magnam voluptatum aut nobis nostrum ea pariatur dolorem, ex beatae officiis sit fuga soluta hic fugit repellat tempora cupiditate assumenda debitis.',
    date: new Date()
  },
  {
    info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quas ex architecto officia minus? Praesentium sequi tempore, est commodi veritatis laborum provident illum sapiente veniam minima ex, exercitationem distinctio doloremque?Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem id fugit voluptatem, consequatur error laboriosam in expedita recusandae labore nesciunt omnis tempore aliquam porro dolores ad voluptates assumenda voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magnam voluptatum aut nobis nostrum ea pariatur dolorem, ex beatae officiis sit fuga soluta hic fugit repellat tempora cupiditate assumenda debitis.',
    date: new Date()
  }
]

const seed = async() => {
  await db.sync({force: true});

  await Promise.all(media.map(medium => {
    return Media.create(medium);
  }));

  await Promise.all(tags.map(tag => {
    return Tag.create(tag);
  }));

  await Promise.all(annotations.map(annotation =>{ 
    return Annotation.create(annotation);
  }))

  console.log(green('Seeding success!'));
  db.close();
}

seed()
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'));
    console.error(err);
    db.close();
  });