const { db, Media, Tag, Annotation, Feed, Combo } = require('../server/db');
const {green, red} = require('chalk')
const media  = require('./data/media.json');

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

  await Combo.create({
    mediumId: 1,
    pairId: 2
  })
  
  await Combo.create({
    mediumId: 3,
    pairId: 2
  })

  await Combo.create({
    mediumId: 1,
    pairId: 3
  })

  await Feed.create({
    comboId: 1, 
    annotationId: 3, 
  })

  await Feed.create({
    comboId: 1, 
    annotationId: 4, 
  })



  console.log(green('Seeding success!'));
  db.close();
}

seed()
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'));
    console.error(err);
    db.close();
  });