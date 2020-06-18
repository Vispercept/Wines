const { expect } = require('chai');
const server = require('../../server');
const dbUtils = require('../../../test/utils/db');

describe('/api/wine', () => {
  beforeEach(dbUtils.insertTestWines);
  afterEach(dbUtils.clearTestCollection);

  describe('GET', () => {
    it('return 200 and a list of all wines in stock', async () => {
      const res = await server.inject({ method: 'GET', url: '/api/wine' });
      expect(res.statusCode).to.be.equal(200);
      expect(res.json().length).to.be.equal(5);
    });
  });
});
