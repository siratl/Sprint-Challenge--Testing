const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  server.send(`***** Server Running ****`);
});

module.exports = server;
