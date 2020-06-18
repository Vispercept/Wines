const mongoose = require('mongoose');
const db = require('../../db');

const Wine = mongoose.model('Wine');

const wines = [
  {
    _id: '5eea66396e81c7002b28b8aa', name: 'pinot', type: 'white', country: 'Italy', year: 2005,
  },
  {
    _id: '5eea66396e81c7002b28b8ab', name: 'pinot grigio', type: 'white', country: 'Italy', year: 1999,
  },
  {
    _id: '5eea66396e81c7002b28b8ac', name: 'chardonnay', type: 'white', country: 'France', year: 2012,
  },
  {
    _id: '5eea66396e81c7002b28b8ad', name: 'merlot', type: 'red', country: 'Italy', year: 2000,
  },
  {
    _id: '5eea66396e81c7002b28b8ae', name: 'bardolino', type: 'red', country: 'Italy', year: 2003,
  },
];

async function insertTestWines() {
  await db.connect();
  await Promise.all(wines.map((wine) => new Wine(wine).save()));
}

async function clearTestCollection() {
  await db.connect();
  await Wine.deleteMany({});
}

module.exports = {
  clearTestCollection,
  insertTestWines,
};
