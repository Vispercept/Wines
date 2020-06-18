const mongoose = require('mongoose');

const isValidObjectId = mongoose.Types.ObjectId.isValid;

module.exports = {
  validateId: (fastify, id) => { if (!isValidObjectId(id)) throw fastify.httpErrors.notAcceptable(`${id} is not a valid id!`); },
};
