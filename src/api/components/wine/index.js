const getAll = require('./getAll');
const getOne = require('./getOne');
const post = require('./post');
const patch = require('./patch');
const deleteRoute = require('./delete');

module.exports = async function wine(fastify) {
  getAll(fastify);
  getOne(fastify);
  post(fastify);
  patch(fastify);
  deleteRoute(fastify);
};
