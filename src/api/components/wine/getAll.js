const Wine = require('../../../db/models/Wine');
const wineSchema = require('../../../db/models/Wine/json-schema.json');

const schema = {
  schema: {
    tags: ['Wine-Api'],
    summary: 'get a list of all wines in stock',
    response: {
      200: { description: 'all wines in stock', type: 'array', items: wineSchema },
    },
  },
};

module.exports = async function getAll(fastify) {
  fastify.get('/', schema, async () => Wine.find(undefined, { __v: 0 }));
};
