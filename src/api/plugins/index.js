const fastifyHelmet = require('fastify-helmet');
const swagger = require('fastify-swagger');
const sensible = require('fastify-sensible');

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

module.exports = async function wine(fastify) {
  fastify.register(fastifyHelmet);
  fastify.register(sensible);
  fastify.register(swagger, swaggerOpts);
  fastify.get('/', (_, reply) => reply.redirect('/docs'));
};
