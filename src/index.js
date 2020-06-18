const server = require('./api/server');
const db = require('./db');

db
  .connect()
  .then(server.start);
