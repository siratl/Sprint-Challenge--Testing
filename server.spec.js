const request = require('supertest');

const server = require('./server');

describe('POST /games', () => {
  it('should take in an object', () => {
    request(server)
      .post('/games')
      .send({
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980, // not required
      })
      .then(res => expect(res.status).toBe(201));
  });

  it('should return status code 422 if required information incomplete', () => {
    request(server)
      .post('/games')
      .then(res => expect(res.status).toBe(422));
  });

  it('should validate that game title is unique', () => {
    return request(server)
      .post('/games')
      .send({
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980, // not required
      })
      .then(res => expect(res.status).toBe(405));
  });
});

describe('GET /games', () => {
  it('should return list of all games and status code 200', () => {
    request(server)
      .get('/games')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body).toEqual(expect.arrayContaining([]));
      });
  });
});

describe('GET /games/:id', () => {
  it('should return status code 404 if game not found', () => {
    return request(server)
      .get('/games/500')
      .then(res => expect(res.status).toBe(404));
  });
});

describe('DELETE /games/:id', () => {
  it('should delete game with corresponding id', () => {
    return request(server)
      .delete('/games/3')
      .then(res => expect(res.status).toBe(200));
  });
});
