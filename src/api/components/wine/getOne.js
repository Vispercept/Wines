const mongoose = require('mongoose');
const Wine = require('../../../db/models/Wine');
const wineSchema = require('../../../db/models/Wine/json-schema.json');

const isValidObjectId = mongoose.Types.ObjectId.isValid;

const schema = {
  tags: ['Wine-Api'],
  summary: 'get a details of a specific wine',
  params: {
    type: 'object',
    properties: {
      id: {
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
  const validateId = (id) => { if (!isValidObjectId(id)) throw fastify.httpErrors.notAcceptable(`${id} is not a valid id!`); };

  fastify.get('/:id', { schema }, async ({ params: { id } }) => {
    validateId(id);

    return await Wine.findOne({ _id: id }, { __v: 0 }) || fastify.httpErrors.notFound(`No wine in stock with id ${id}`);
  });
};
