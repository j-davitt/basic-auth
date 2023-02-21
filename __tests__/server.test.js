'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelizeDB } = require('../src/auth/models');

const request = supertest(app);

beforeAll(async () => {
  await sequelizeDB.sync();
});

afterAll(async () => {
  await sequelizeDB.drop();
});

describe('Auth router', () => {
  it('should create a new user', async () => {
    const response = await request.post('/signup').send({
      username: 'test',
      password: '123456',
    });

    // console.log(response.body);
    expect(response.body.username).toBe('test');
    // expect(response.status).toBe(403);
  });

  it('should login a user', async () => {
    const response = await request.post('/signin').auth('test', '123456');

    expect(response.body.username).toBe('test');
    expect(response.status).toBe(200);
    expect(response.body.password).toBeTruthy();
  });
});
