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
    200: { description: 'wine deleted', type: 'null' },
    400: { description: 'invalid or missing payload', type: 'object' },
  },
};

module.exports = async function getAll(fastify) {
  fastify.delete('/:wineId', { schema }, async ({ params: { wineId } }) => {
    validateId(fastify, wineId);

    const { deletedCount } = await Wine.deleteOne({ _id: wineId });
    return deletedCount ? null : fastify.httpErrors.notFound(`No wine in stock with id ${wineId}`);
  });
};
