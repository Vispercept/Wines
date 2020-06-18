const fastify = require('fastify')({ logger: { prettyPrint: true }, disableRequestLogging: !process.env.requestLogging });
const sensible = require('fastify-sensible');
const fastifyHelmet = require('fastify-helmet');
const wine = require('./components/wine');
const plugins = require('./plugins');

fastify.register(sensible);
fastify.register(fastifyHelmet);
fastify.register(plugins);
fastify.register(wine, { prefix: '/api/wine' });

const port = process.env.PORT || 8080;

async function start() {
  await fastify.listen(port, '0.0.0.0');
  fastify.log.info(`✅ Server listening on: ${fastify.server.address().port}`);
  return fastify;
}

module.exports = {
  start,
  ...fastify,
};
