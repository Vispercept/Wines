const mongoose = require('mongoose');

const isValidObjectId = mongoose.Types.ObjectId.isValid;

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
  const validateId = (id) => { if (!isValidObjectId(id)) throw fastify.httpErrors.notAcceptable(`${id} is not a valid id!`); };

  fastify.delete('/:wineId', { schema }, async ({ params: { wineId } }) => {
    validateId(wineId);

    const { deletedCount } = await mongoose.model('Wine').deleteOne({ _id: wineId });
    return deletedCount ? null : fastify.httpErrors.notFound(`No wine in stock with id ${wineId}`);
  });
};
