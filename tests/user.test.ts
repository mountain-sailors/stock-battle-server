import request from 'supertest';
import App from '../src/app';

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6InRlc3RfdXNlciIsInVzZXJFbWFpbCI6InRlc3RfdXNlckBlbWFpbC5jb20iLCJpYXQiOjE2MzY5NjY5NzQsImV4cCI6MTYzNzU3MTc3NH0.221-iQjwXD-GzNUepM2sJFC5AB2bf00pM095uOuAGkY';

describe('Test "POST /api/user/validation"', () => {
  test("Email  doesn't exist", async () => {
    const body = {
      email: 'test_user@email.com',
    };
    const response = await request(App).post('/api/user/validation').send(body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ isEmailExist: false });
  });
  test('Email exists', async () => {
    const body = {
      email: 'admin@email.com',
    };
    const response = await request(App).post('/api/user/validation').send(body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ isEmailExist: true });
  });
});

describe('Test "POST /api/user"', () => {
  test('Normal case', async () => {
    const body = {
      username: 'test_user',
      email: 'test_user@email.com',
      password: 'password',
      avatar: '2',
    };
    const response = await request(App).post('/api/user').send(body);
    expect(response.statusCode).toBe(200);
  });

  test('Invalid input', async () => {
    const body = {
      username: 'test_us',
    };
    const response = await request(App).post('/api/user').send(body);
    expect(response.statusCode).toBe(400);
  });

  test('Duplicate username or email', async () => {
    const body = {
      username: 'test_user',
      email: 'test_user@email.com',
      password: 'password',
      avatar: '2',
    };
    const response = await request(App).post('/api/user').send(body);
    expect(response.statusCode).toBe(400);
  });
});

describe('Test "POST /api/user/login"', () => {
  test('Normal case', async () => {
    const body = {
      email: 'test_user@email.com',
      password: 'password',
    };
    const response = await request(App).post('/api/user/login').send(body);
    expect(response.statusCode).toBe(200);
  });
  test('Invalid input', async () => {
    const body = {
      username: 'test_user',
      password: 'password',
    };
    const response = await request(App).post('/api/user/login').send(body);
    expect(response.statusCode).toBe(400);
  });
  test('Invalid email', async () => {
    const body = {
      email: 'test_user2@email.com',
      password: 'password',
    };
    const response = await request(App).post('/api/user/login').send(body);
    expect(response.statusCode).toBe(400);
  });
  test('Wrong password', async () => {
    const body = {
      email: 'test_user@email.com',
      password: 'pwd',
    };
    const response = await request(App).post('/api/user/login').send(body);
    expect(response.statusCode).toBe(400);
  });
});

describe('Test "GET /api/user/search"', () => {
  test('Normal case', async () => {
    const response = await request(App)
      .get('/api/user/search')
      .query({ username: 'admin' })
      .set({ Authorization: token });
    expect(response.statusCode).toBe(200);
    console.log(response.body);
  });
});

describe('Test "DELETE /api/user"', () => {
  test('Normal case', async () => {
    const response = await request(App).delete('/api/user').set({ Authorization: token });
    expect(response.statusCode).toBe(200);
  });
});
