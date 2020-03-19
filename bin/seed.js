const { db, Media, Tag, Annotation, Feed, Combo, MediaTag, ComboTag } = require('../server/db');
const {green, red} = require('chalk')
const media  = require('./data/media.json');
const mediaTags  = require('./data/mediaTags.json');
const tags = require('./data/tags.json');
const comboTags = require('./data/comboTags.json');

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

  // The bulkCreate method is better because it doesnt alter the order of ids assignment.
  // Promise.all alters the id assignment which impacts expected data. This probably happens because promiseAll  what for all the promised to finish in there own time.
  
  // For example, assume that you have ten promises (Async operation to perform a network call or a database connection). You have to know when all the promises get resolved or you have to wait till all the promises resolve. So you are passing all ten promises to Promise.all. Then, Promise.all itself as a promise will get resolved once all the ten promises get resolved or any of the ten promises get rejected with an error.
  await Media.bulkCreate(media);
  await Tag.bulkCreate(tags);
  await MediaTag.bulkCreate(mediaTags);
  await Annotation.bulkCreate(annotations);


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



  await ComboTag.bulkCreate(comboTags);


  console.log(green('Seeding success!'));
  db.close();
}

seed()
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'));
    console.error(err);
    db.close();
  });