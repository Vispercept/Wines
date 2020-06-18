const { expect } = require('chai');
const mongoose = require('mongoose');
const server = require('../../server');
const dbUtils = require('../../../test/utils/db');

describe('/api/wine/:wineId', () => {
  beforeEach(dbUtils.insertTestWines);
  afterEach(dbUtils.clearTestCollection);

  describe('DELETE', () => {
    it('should return 200 and delete a specfic wine', async () => {
      const res = await server.inject({ method: 'DELETE', url: '/api/wine/5eea66396e81c7002b28b8aa' });
      expect(res.statusCode).to.be.equal(200);
      expect(res.json()).to.be.equal(null);
      const findResult = await mongoose.model('Wine').findOne({ _id: '5eea66396e81c7002b28b8aa' }, { __v: 0 });
      expect(findResult).to.be.equal(null);
    });

    it('should return 404 if id is not found', async () => {
      const res = await server.inject({ method: 'DELETE', url: '/api/wine/5eea66396e81c7002b28b8a0', payload: { year: 2012 } });
      expect(res.statusCode).to.be.equal(404);
      expect(res.json().message).to.be.equal('No wine in stock with id 5eea66396e81c7002b28b8a0');
    });

    it('should return 406 if id is invalid', async () => {
      const res = await server.inject({ method: 'DELETE', url: '/api/wine/adsffffff', payload: { year: 2012 } });
      expect(res.statusCode).to.be.equal(406);
      expect(res.json().message).to.be.equal('adsffffff is not a valid id!');
    });
  });
});
