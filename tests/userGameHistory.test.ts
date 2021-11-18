import request from 'supertest';
import App from '../src/app';

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VybmFtZSI6InRlc3RfdXNlciIsInVzZXJFbWFpbCI6InRlc3RfdXNlckBlbWFpbC5jb20iLCJpYXQiOjE2MzcxMTgzNTksImV4cCI6MTYzNzcyMzE1OX0.hbCAgVf47KG-M56-LcjVNk-_ewUMm2gDKelStTnfzEk';

describe('Test "GET /api/game-history"', () => {
  test('Normal case', async () => {
    const userId = 1;
    const response = await request(App).get(`/api/game-history/${userId}`).set({ Authorization: token });
    expect(response.statusCode).toBe(200);
    console.log(response.body);
  });
});
