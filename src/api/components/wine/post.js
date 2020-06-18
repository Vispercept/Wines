const mongoose = require('mongoose');
const wineSchema = require('../../../db/models/Wine/json-schema.json');

const schema = {
  tags: ['Wine-Api'],
  summary: 'add a new wine',
  body: { ...wineSchema },
  response: {
    200: { description: 'wine stored', ...wineSchema },
    404: { description: 'invalid or missing payload', type: 'object' },
  },
};

module.exports = async function getAll(fastify) {
  fastify.post('/', { schema }, ({ body }) => new mongoose.model('Wine')(body).save());
};
