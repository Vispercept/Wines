const swagger = require('fastify-swagger');

const package = require('../../../package.json');
const WineSchema = require('../../db/models/Wine/json-schema.json');

const swaggerOpts = {
  routePrefix: '/docs',
  swagger: {
    info: { ...package, title: package.name },
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'Wine-Api', description: 'manage wines in stock' }],
    definitions: { Wine: WineSchema },
  },
  exposeRoute: true,
};

module.exports = async function plugins(fastify) {
  fastify.register(swagger, swaggerOpts);
  fastify.get('/', {
    schema: {
      response: {
        302: {
          description: 'redirect to the docs for now',
          type: 'string',
        },
      },
    },
  }, (_, reply) => reply.redirect('/docs'));
};
