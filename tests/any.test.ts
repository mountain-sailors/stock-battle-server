import request from 'supertest';
import App from '../src/app';

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(App).get('/');
    expect(response.statusCode).toBe(200);
  });
});
