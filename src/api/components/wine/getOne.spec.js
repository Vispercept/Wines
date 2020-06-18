const { expect } = require('chai');
const mongoose = require('mongoose');
const server = require('../../server');
const dbUtils = require('../../../test/utils/db');

describe('/api/wine/:wineId', () => {
  beforeEach(dbUtils.insertTestWines);
  afterEach(dbUtils.clearTestCollection);

  describe('GET', () => {
    it('should return 200 and details about a specific wine', async () => {
      const res = await server.inject({ method: 'GET', url: '/api/wine/5eea66396e81c7002b28b8aa' });
      expect(res.statusCode).to.be.equal(200);
      expect(res.json()).to.be.deep.equal({
        _id: '5eea66396e81c7002b28b8aa', name: 'pinot', year: 2005, country: 'Italy', type: 'white',
      });
    });

    it('should return 404 if id is not found', async () => {
      const res = await server.inject({ method: 'GET', url: '/api/wine/5eea66396e81c7002b28b8a0' });
      expect(res.statusCode).to.be.equal(404);
      expect(res.json().message).to.be.equal('No wine in stock with id 5eea66396e81c7002b28b8a0');
    });

    it('should return 406 if id is invalid', async () => {
      const res = await server.inject({ method: 'GET', url: '/api/wine/adsffffff' });
      expect(res.statusCode).to.be.equal(406);
      expect(res.json().message).to.be.equal('adsffffff is not a valid id!');
    });
  });
});
