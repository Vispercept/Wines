const fastify = require('fastify')({ logger: true });
const wine = require('./components/wine');
const plugins = require('./plugins');

fastify.register(plugins);
fastify.register(wine, { prefix: '/api/wine' });

async function start() {
  await fastify.listen(8080, '0.0.0.0');
  fastify.log.info(`✅ Server listening on: ${fastify.server.address().port}`);
}

module.exports = {
  start,
};
