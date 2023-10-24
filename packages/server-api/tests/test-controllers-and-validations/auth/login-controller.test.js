/* eslint-disable no-undef */
const testConfig = require('../../test.config');

const request = testConfig();

jest.mock('../../../src/api/services/user-service.js');
jest.mock('../../../src/api/services/profile-service.js');

const BASE_URI = '/api/v1/auth';

describe('POST /auth/login', () => {
  const URL = `${BASE_URI}/login`;

  it('should response with 200 status code on successful login to the system', async () => {
    const body1 = {
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'logintest1@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    };
    const body2 = {
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'logintest2@gmail.com',
      password: 'hiiamalam',
      confirmPassword: 'hiiamalam',
    };

    await request.post(`${BASE_URI}/register`).send(body1);
    await request.post(`${BASE_URI}/register`).send(body2);

    const res1 = await request.post(URL).send({
      email: body1.email,
      password: body1.password,
    });
    expect(res1.status).toBe(200);
    expect(res1.body).toBeDefined();

    const res2 = await request.post(URL).send({
      email: body2.email,
      password: body2.password,
    });
    expect(res2.status).toBe(200);
    expect(res2.body.message).toBeDefined();
    expect(res2.body.token).toBeDefined();
  });

  it('should response with 401 status code on invalid email address', async () => {
    const body = {
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'logintest3@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    };

    await request.post(`${BASE_URI}/register`).send(body);

    const res = await request.post(URL).send({
      email: 'different@gmail.com',
      password: body.password,
    });

    expect(res.status).toBe(401);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('UnauthorizeError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 401 status code on invalid password', async () => {
    const body = {
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'logintest4@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    };

    await request.post(`${BASE_URI}/register`).send(body);

    const res = await request.post(URL).send({
      email: body.email,
      password: 'different',
    });

    expect(res.status).toBe(401);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('UnauthorizeError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 401 status code on invalid email and password', async () => {
    const body = {
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'test4@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    };

    await request.post(`${BASE_URI}/register`).send(body);

    const res = await request.post(URL).send({
      email: 'different@gmail.com',
      password: 'different',
    });

    expect(res.status).toBe(401);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('UnauthorizeError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on invalid email address', async () => {
    const res = await request.post(URL).send({
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'unsuccessful',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on email address with less than 5 characters long', async () => {
    const res = await request.post(URL).send({
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'u@c',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on email address with more than 150 characters long', async () => {
    const res = await request.post(URL).send({
      firstName: 'Janay',
      lastName: 'Alam',
      email:
        'unsuccesstestunsuccesstestunsuccesstestunsuccesstestunsuccesstestunsuccesstestunsuccesstestunsuccesstestunsuccesstestunsuccesstestunsuccesstest@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on empty password', async () => {
    const res = await request.post(URL).send({
      email: 'unsuccesstest@gmail.com',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on password with less than 6 characters long', async () => {
    const res = await request.post(URL).send({
      email: 'unsuccesstest@gmail.com',
      password: 'hihih',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });
});
