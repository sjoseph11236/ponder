const { expect } = require('chai');
const db = require('./test_db');
const { red } = require('chalk')
const { Media } = require('./test_db');

describe('Ponder TDD ', () => {
  describe('Models', () => {
    describe('Media', () => { 
      let seed; 

      beforeEach( async () => seed = await db.syncAndSeed().catch(err => {
        console.error(red('Oh noes! Something went wrong!'));
        console.error(err);
      }));
      
      
      it('All media should have a title', ()=> {
        expect(seed.media.medium1.title).to.equal('Coming to America');
        expect(seed.media.medium2.title).to.equal('This is America');
        expect(seed.media.medium3.title).to.equal('Us');
        expect(seed.media.medium4.title).to.equal('American Psycho');
      });

      it('All media should have an artist', ()=> {
        expect(seed.media.medium1.artist).to.equal('John Landis');
        expect(seed.media.medium2.artist).to.equal('Donald Glover');
        expect(seed.media.medium3.artist).to.equal('Jordan Peele');
        expect(seed.media.medium4.artist).to.equal('Mary Harron');
      });

      describe('filterByKeyword', () => {
        it('returns array with media with the keyword ', async ()=> {
          const filtered  = await Media.filterByKeyword('america');
          expect(filtered.length).to.equal(3);
        });
      })
      
    });

    
  });
});
