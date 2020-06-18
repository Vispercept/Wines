const getAll = require('./getAll');
const getOne = require('./getOne');
const patch = require('./patch');

module.exports = async function wine(fastify) {
  getAll(fastify);
  getOne(fastify);
  patch(fastify);
};
