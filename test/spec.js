const { expect } = require('chai');
const db = require('./db');

describe('Ponder TDD ', () => {
  describe('Data Layer', () => { 
    let seed; 
    beforeEach( async () => seed = await db.syncAndSeed());
    it('media should have title', ()=> {
      expect(seed.media.medium1.title).to.equal('Coming to America');
      expect(seed.media.medium2.title).to.equal('American Psycho');
      expect(seed.media.medium3.title).to.equal('This is America');
    });
  });
});
