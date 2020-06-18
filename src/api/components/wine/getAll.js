const Wine = require('../../../db/models/Wine');

const schema = {
  schema: {
    tags: ['Wine-Api'],
    summary: 'get a list of all wines',
  },
};

module.exports = async function getAll(fastify) {
  fastify.get('/', schema, async () => Wine.find(undefined, { __v: 0 }));
};
