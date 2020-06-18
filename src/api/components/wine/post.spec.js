const { expect } = require('chai');
const mongoose = require('mongoose');
const server = require('../../server');
const dbUtils = require('../../../test/utils/db');

describe('/api/wine', () => {
  beforeEach(dbUtils.insertTestWines);
  afterEach(dbUtils.clearTestCollection);

  describe('POST', () => {
    it('should return 200 and store a new wine', async () => {
      const newWine = {
        name: 'Tempranillo',
        type: 'red',
        year: 2002,
        country: 'Spain',
      };
      const res = await server.inject({ method: 'POST', url: '/api/wine', payload: newWine });
      expect(res.statusCode).to.be.equal(200);
      const postResponseWine = res.json();
      expect(postResponseWine._id).to.be.lengthOf(24);
      delete postResponseWine._id;

      expect(postResponseWine).to.be.deep.equal(newWine);
      const findResult = await mongoose.model('Wine').findOne({ name: 'Tempranillo' }, { _id: 0, __v: 0 });
      expect(JSON.parse(JSON.stringify(findResult))).to.be.deep.equal(newWine);
    });

    it('should return 400 if payload is missing', async () => {
      const res = await server.inject({ method: 'POST', url: '/api/wine' });
      expect(res.statusCode).to.be.equal(400);
      expect(res.json().message).to.be.equal('body should be object');
    });

    it('should return 400 if payload is invalid', async () => {
      const res = await server.inject({ method: 'POST', url: '/api/wine', payload: { year: 2012 } });
      expect(res.statusCode).to.be.equal(400);
      expect(res.json().message).to.be.equal("body should have required property 'name', body should have required property 'country', body should have required property 'type'");
    });
  });
});
