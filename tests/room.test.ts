import request from 'supertest';
import App from '../src/app';

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2MzY5NDk3NDgsImV4cCI6MTYzNzU1NDU0OH0.jUcfLr5WPhFopGOqZKS212DlffIYpbcoCrUdaVyc_e8';

const anotherToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiamh1ciIsInVzZXJFbWFpbCI6ImpodXJAZW1haWwuY29tIiwiaWF0IjoxNjM3MDU4NjgwLCJleHAiOjE2Mzc2NjM0ODB9.ggk3bELhAFGKSerUdS4nH7kkLpY5dXSbnPD6axaZvHk';

describe('Test the root path', () => {
  test('GET method: get my rooms', async () => {
    const response = await request(App).get('/api/room').set('Authorization', token);
    expect(response.statusCode).toBe(200);
  });

  // test('POST method: Creating Room Success', async () => {
  //   const body = {
  //     title: 'unitTestRoom',
  //     maxCapacity: 4,
  //     startDate: new Date(),
  //     endDate: new Date().setDate(new Date().getDate() + 7),
  //     winCondition: 'MAX_FLUCTUATION',
  //   };
  //   const response = await request(App).post('/api/room').set('Authorization', token).send(body);
  //   expect(response.statusCode).toBe(200);
  // });

  test('POST method: Creating Room Bad Request', async () => {
    const body = {
      title: 'hellow',
    };
    const response = await request(App).post('/api/room').set('Authorization', token).send(body);
    expect(response.statusCode).toBe(400);
  });

  // test('POST method: Enter room by invitation', async () => {
  //   const body = {
  //     invitationCode: 'dwq',
  //   };
  //   const response = await request(App).post('/api/room/invitation').set('Authorization', token).send(body);
  //   expect(response.statusCode).toBe(200);
  // });

  test('POST method: Cannot enter room', async () => {
    const body = {
      invitationCode: 'MjQ0YWExODktODRmYy00MDhjLTk4OWMtMzhkMjBhY2MwM2Yy',
    };
    const response = await request(App).post('/api/room/invitation').set('Authorization', token).send(body);
    expect(response.statusCode).toBe(410);
  });

  test('POST method: Room does not exist', async () => {
    const body = {
      invitationCode: 'd11111',
    };
    const response = await request(App).post('/api/room/invitation').set('Authorization', token).send(body);
    expect(response.statusCode).toBe(404);
  });

  test('POST method: Already in room', async () => {
    const body = {
      invitationCode: 'OTE3NWFjMDktYmM2NC00ZmU4LTk5ZDYtZTEzYzlmYmE4YTk4',
    };
    const response = await request(App).post('/api/room/invitation').set('Authorization', token).send(body);
    expect(response.statusCode).toBe(400);
  });

  test('POST method: Room is Full', async () => {
    const body = {
      invitationCode: 'YTNlODNiZGUtYmExZi00ZjAwLWE5OGItYzM5Y2MzOWVhMDhk',
    };
    const response = await request(App).post('/api/room/invitation').set('Authorization', anotherToken).send(body);
    expect(response.statusCode).toBe(403);
  });
});
