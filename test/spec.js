const { expect } = require('chai');
const db = require('./test_db');
const { red } = require('chalk')

describe('Ponder TDD ', () => {
  describe('Data Layer', () => { 
    let seed; 
    beforeEach( async () => seed = await db.syncAndSeed().catch(err => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    }) );

    it('All media should have title', ()=> {
      expect(seed.media.medium1.title).to.equal('Coming to America');
      expect(seed.media.medium2.title).to.equal('American Psycho');
      expect(seed.media.medium3.title).to.equal('This is America');
      expect(seed.media.medium4.title).to.equal('Us');
    });
  });
});
