const mongoose = require('mongoose');
// const Wine = require('./models/Wine');
const mongooseSchema = require('./models/Wine/mongoose-schema.json');

const wineSchema = new mongoose.Schema(mongooseSchema, { collection: process.env.collection || 'Wine' });

if (!mongoose.modelNames().includes('Wine')) mongoose.model('Wine', wineSchema);

const opts = { useNewUrlParser: true, useUnifiedTopology: true };

async function connect() {
  await mongoose.connect('mongodb://mongodb/wines', opts);
  // await mongoose.model('Wine')({
  //   name: 'pinot', type: 'red', country: 'Germany', year: 1999,
  // }).save();
  // await mongoose.model('Wine')({
  //   name: 'pinot2', type: 'red', country: 'Germany', year: 1999,
  // }).save();
}

module.exports = {
  connect,
};
