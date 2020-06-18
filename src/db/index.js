const mongoose = require('mongoose');
const Wine = require('./models/Wine');

const opts = { useNewUrlParser: true, useUnifiedTopology: true };

async function connect() {
  await mongoose.connect('mongodb://mongodb/wines', opts);
  // await new Wine({
  //   name: 'pinot2', type: 'red', country: 'Germany', year: 1999,
  // }).save();
  // await new Wine({
  //   name: 'pinot3', type: 'red', country: 'Germany', year: 1999,
  // }).save();
}

module.exports = {
  connect,
};
