const mongoose = require('mongoose');
const mongooseSchema = require('./mongoose-schema.json');

const wineSchema = new mongoose.Schema(mongooseSchema);

module.exports = mongoose.model('Wine', wineSchema);
