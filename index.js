const server = require('./server.js');

const PORT = 4400 || 3300;

server.listen(PORT, () =>
  console.log(`\n=== Web SERVER Listening on http://localhost:${PORT} ===\n`),
);
