const express = require('express');

const server = express();

server.use(express.json());

let gamesData = [];

let startIndex = 0;

const increment = () => {
  return (startIndex += 1);
};

server.get('/', (req, res) => {
  res.send(`***** Server Running *****`);
});

//**************** POST ENPOINT *************/
server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const result = { id: increment(), title, genre, releaseYear };

  if (!title || !genre) {
    res
      .status(422)
      .json({ message: 'The title and genre fields are required.' });
  } else {
    const duplicateTitle = gamesData.find(game => game.title === title);

    if (duplicateTitle) {
      res
        .status(405)
        .json({ message: 'A title with the specified name already exists.' });
    } else {
      gamesData.push(result);
      res.status(201).json({ message: 'Game added sucessfully.', result });
    }
  }
});

//**************** GET ENPOINT *************/
server.get('/games', (req, res) => {
  res.json(gamesData);
});

server.get('/games/:id', (req, res) => {
  const { id } = req.params;
  const gameId = gamesData.find(game => game.id == id);

  if (gameId) {
    res.json(gameId);
  } else {
    res.status(404).json({ message: `Game with id: ${id} not found.` });
  }
});

server.delete('/games/:id', (req, res) => {
  const { id } = req.params;
  const gameId = gamesData.filter(game => game.id != id);

  res.json({ message: `Game Deleted!` });
});

module.exports = server;
