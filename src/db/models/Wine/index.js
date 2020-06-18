const mongoose = require('mongoose');
const WineSchemaJSON = require('./mongoose-schema.json');

const wineSchema = new mongoose.Schema(WineSchemaJSON, { collection: process.env.collection || 'Wine' });

if (!mongoose.modelNames().includes('Wine')) mongoose.model('Wine', wineSchema);

module.exports = mongoose.model('Wine');
