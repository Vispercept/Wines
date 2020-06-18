const mongoose = require('mongoose');
const WineSchemaJSON = require('./models/Wine/mongoose-schema.json');

const wineSchema = new mongoose.Schema(WineSchemaJSON, { collection: process.env.collection || 'Wine' });

if (!mongoose.modelNames().includes('Wine')) mongoose.model('Wine', wineSchema);

const opts = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = {
  connect: () => mongoose.connect('mongodb://mongodb/wines', opts),
};
