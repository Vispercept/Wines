const wineSchema = require('../../../db/models/Wine/json-schema.json');
const Wine = require('../../../db/models/Wine');
const { validateId } = require('../../utils');

const schema = {
  tags: ['Wine-Api'],
  summary: 'change details of a specfic wine',
  params: {
    type: 'object',
    properties: {
      wineId: {
        type: 'string',
        description: 'The id of the wine to show',
      },
    },
  },
  body: {
    ...wineSchema,
    required: [], // nothing is required here due to this is an PATCH route
  },
  response: {
    200: { description: 'wine updted', ...wineSchema },
    404: { description: 'invalid or missing payload', type: 'object' },
    406: { description: 'invalid id error object', type: 'object' },
  },
};

module.exports = async function getAll(fastify) {
  fastify.patch('/:wineId', { schema }, async ({ params: { wineId }, body }) => {
    validateId(fastify, wineId);

    await Wine.updateOne({ _id: wineId }, body);
    return await Wine.findOne({ _id: wineId }, { __v: 0 }) || fastify.httpErrors.notFound(`No wine in stock with id ${wineId}`);
  });
};
