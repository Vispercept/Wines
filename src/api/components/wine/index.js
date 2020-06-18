const getAll = require('./getAll');
const getOne = require('./getOne');

const schema = {
  schema: {
    // description: 'post some data',
    tags: ['Wine-Api'],
    summary: 'get a list of all wines',
    // params: {
    //   type: 'object',
    //   properties: {
    //     id: {
    //       type: 'string',
    //       description: 'user id',
    //     },
    //   },
    // },
    // body: {
    //   type: 'object',
    //   properties: {
    //     hello: { type: 'string' },
    //     obj: {
    //       type: 'object',
    //       properties: {
    //         some: { type: 'string' },
    //       },
    //     },
    //   },
    // },
    // response: {
    //   201: {
    //     description: 'Successful response',
    //     type: 'object',
    //     properties: {
    //       hello: { type: 'string' },
    //     },
    //   },
    // },
  },
};

module.exports = async function wine(fastify) {
  getAll(fastify);
  getOne(fastify);
};
