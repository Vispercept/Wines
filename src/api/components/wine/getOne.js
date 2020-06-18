const wineSchema = require('../../../db/models/Wine/json-schema.json');
const { validateId } = require('../../utils');
const Wine = require('../../../db/models/Wine');

const schema = {
  tags: ['Wine-Api'],
  summary: 'get a details of a specific wine',
  params: {
    type: 'object',
    properties: {
      wineId: {
        type: 'string',
        description: 'The id of the wine to show',
      },
    },
  },
  response: {
    200: { description: 'wine found', ...wineSchema },
    404: { description: 'wine not found error object', type: 'object' },
    406: { description: 'invalid id error object', type: 'object' },
  },
};

module.exports = async function getAll(fastify) {
  fastify.get('/:wineId', { schema }, async ({ params: { wineId } }) => {
    validateId(fastify, wineId);

    return await Wine.findOne({ _id: wineId }, { __v: 0 }) || fastify.httpErrors.notFound(`No wine in stock with id ${wineId}`);
  });
};
