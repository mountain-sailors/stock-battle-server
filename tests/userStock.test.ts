import request from 'supertest';
import App from '../src/app';

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2MzY5NDk3NDgsImV4cCI6MTYzNzU1NDU0OH0.jUcfLr5WPhFopGOqZKS212DlffIYpbcoCrUdaVyc_e8';

describe('Test the root path', () => {
  test('POST method: register stock setting', async () => {
    const body = {
      roomId: 25,
      ticker: 'GOOGL',
      amount: 1,
    };
    const response = await request(App).post('/api/user-stock').set('Authorization', token).send(body);
    expect(response.statusCode).toBe(200);
  });

  test('POST method: register stock Bad Request', async () => {
    const body = {
      roomId: 1,
      ticker: 'AAPL',
    };
    const response = await request(App).post('/api/user-stock').set('Authorization', token).send(body);
    expect(response.statusCode).toBe(400);
  });

  test('POST method: register stock with invalid roomId', async () => {
    const body = {
      roomId: 100,
      ticker: 'TSLA',
      amount: 1,
    };
    const response = await request(App).post('/api/user-stock').set('Authorization', token).send(body);
    expect(response.statusCode).toBe(400);
  });

  test('GET method: get user stocks by roomId', async () => {
    const response = await request(App).get('/api/user-stock/1').set('Authorization', token);
    expect(response.statusCode).toBe(200);
  });

  test('GET method: get user stocks by wrong roomId', async () => {
    const response = await request(App).get('/api/user-stock/100').set('Authorization', token);
    expect(response.statusCode).toBe(400);
  });
});
