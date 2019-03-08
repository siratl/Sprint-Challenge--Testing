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
});

describe('GET /games', () => {
  it('should return list of all games and status code 200', () => {
    request(server)
      .get('/games')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
      });
  });
});
