const mongoose = require('mongoose');
const wineSchema = require('../../../db/models/Wine/json-schema.json');

const isValidObjectId = mongoose.Types.ObjectId.isValid;

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
  const validateId = (id) => { if (!isValidObjectId(id)) throw fastify.httpErrors.notAcceptable(`${id} is not a valid id!`); };

  fastify.patch('/:wineId', { schema }, async ({ params: { wineId }, body }) => {
    validateId(wineId);

    await mongoose.model('Wine').updateOne({ _id: wineId }, body);
    return await mongoose.model('Wine').findOne({ _id: wineId }, { __v: 0 }) || fastify.httpErrors.notFound(`No wine in stock with id ${wineId}`);
  });
};
