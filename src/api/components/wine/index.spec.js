const { expect } = require('chai');
const mongoose = require('mongoose');
const server = require('../../server');
const dbUtils = require('../../../test/utils/db');

describe('/api/wine', () => {
  beforeEach(dbUtils.insertTestWines);
  afterEach(dbUtils.clearTestCollection);

  describe('GET', () => {
    it('returns all wines in stock', async () => {
      const res = await server.inject({ method: 'GET', url: '/api/wine' });
      expect(res.statusCode).to.be.equal(200);
      expect(res.json().length).to.be.equal(5);
      expect(res.json()[0]).to.be.deep.equal({
        _id: '5eea66396e81c7002b28b8aa', name: 'pinot', year: 2005, country: 'Italy', type: 'white',
      });
      expect(res.json()[2]).to.be.deep.equal({
        _id: '5eea66396e81c7002b28b8ac', name: 'chardonnay', type: 'white', country: 'France', year: 2012,
      });
    });
  });

  describe('POST', () => {
    it('should store a new wine');
  });
});

describe('/api/wine/:wineId', () => {
  beforeEach(dbUtils.insertTestWines);
  afterEach(dbUtils.clearTestCollection);

  describe('GET', () => {
    it('should return details about a specific wine', async () => {
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

  describe('PATCH', () => {
    it('should update details of a wine', async () => {
      const updatedWine = {
        _id: '5eea66396e81c7002b28b8aa', name: 'pinot', year: 2012, country: 'Italy', type: 'white',
      };
      const patchResult = await server.inject({ method: 'PATCH', url: '/api/wine/5eea66396e81c7002b28b8aa', payload: { year: 2012 } });
      expect(patchResult.statusCode).to.be.equal(200);
      expect(patchResult.json()).to.be.deep.equal(updatedWine);

      // check also if the correct wine is now stored in the db
      const findResult = await mongoose.model('Wine').findOne({ _id: '5eea66396e81c7002b28b8aa' }, { __v: 0 });
      const findObj = JSON.parse(JSON.stringify(findResult.toJSON()));
      expect(findObj).to.be.deep.equal(updatedWine);
    });

    it('should return 404 if id is not found', async () => {
      const res = await server.inject({ method: 'PATCH', url: '/api/wine/5eea66396e81c7002b28b8a0', payload: { year: 2012 } });
      expect(res.statusCode).to.be.equal(404);
      expect(res.json().message).to.be.equal('No wine in stock with id 5eea66396e81c7002b28b8a0');
    });

    it('should return 406 if id is invalid', async () => {
      const res = await server.inject({ method: 'PATCH', url: '/api/wine/adsffffff', payload: { year: 2012 } });
      expect(res.statusCode).to.be.equal(406);
      expect(res.json().message).to.be.equal('adsffffff is not a valid id!');
    });

    it('should return 400 without payload', async () => {
      const res = await server.inject({ method: 'PATCH', url: '/api/wine/5eea66396e81c7002b28b8aa' });
      expect(res.statusCode).to.be.equal(400);
      expect(res.json().message).to.be.equal('body should be object');
    });

    it('should return 400 with invalid payload', async () => {
      const res = await server.inject({ method: 'PATCH', url: '/api/wine/5eea66396e81c7002b28b8aa', payload: { year: 12222 } });
      expect(res.statusCode).to.be.equal(400);
      expect(res.json().message).to.be.equal('body.year should be <= 3000');
    });
  });
  describe('DELETE', () => {
    it('should delete a specfic wine');
  });
});
