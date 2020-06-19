const mongoose = require('mongoose');

const opts = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoConnectionUri = process.env.mongoConnectionUri || 'mongodb://mongodb/wines';

module.exports = {
  connect: () => mongoose.connect(mongoConnectionUri, opts),
};
