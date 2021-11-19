import request from 'supertest';
import App from '../src/app';

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VybmFtZSI6InRlc3RfdXNlciIsInVzZXJFbWFpbCI6InRlc3RfdXNlckBlbWFpbC5jb20iLCJpYXQiOjE2MzcxMTgzNTksImV4cCI6MTYzNzcyMzE1OX0.hbCAgVf47KG-M56-LcjVNk-_ewUMm2gDKelStTnfzEk';

describe('Test "GET /api/stock"', () => {
  test('Normal case', async () => {
    const response = await request(App).get(`/api/stock`).set({ Authorization: token });
    expect(response.statusCode).toBe(200);
    console.log(response.body);
  });
});

describe('Test "GET /api/stock/search"', () => {
  test('Normal case1', async () => {
    const ticker = 'AAPL';
    const response = await request(App).get(`/api/stock/search`).set({ Authorization: token }).query({ ticker });
    expect(response.statusCode).toBe(200);
    console.log(response.body);
  });
  test('Normal case2', async () => {
    const ticker = 'A';
    const response = await request(App).get(`/api/stock/search`).set({ Authorization: token }).query({ ticker });
    expect(response.statusCode).toBe(200);
    console.log(response.body);
  });
});
