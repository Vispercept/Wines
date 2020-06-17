'use strict';

const fastify = require('fastify')({ logger: true });

fastify.get('/', (__, reply) => {
  reply.send({ hello: 'world' });
});

/**
 * Starts the server
 * @returns {Void} Void
 */
async function startServer() {
  await fastify.listen(8080, '0.0.0.0');

  fastify.log.info(`✅ Server listening on: ${fastify.server.address().port}`);
}

startServer();
