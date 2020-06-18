const mongoose = require('mongoose');

const opts = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = {
  connect: () => mongoose.connect('mongodb://mongodb/wines', opts),
};
