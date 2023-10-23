/* eslint-disable no-undef */
const testConfig = require('../test.config');

const request = testConfig();

jest.mock('../../src/api/services/user-service.js');
jest.mock('../../src/api/services/profile-service.js');

const BASE_URI = '/api/v1/auth';

describe('POST /auth/register', () => {
  const URL = `${BASE_URI}/register`;

  it('should response with 201 status code for valid request body', async () => {
    const body1 = {
      firstName: 'Test',
      lastName: 'User 2',
      email: 'test2@gmail.com',
      password: 'Alam12',
      confirmPassword: 'Alam12',
    };
    const body2 = {
      firstName: 'Test',
      lastName: 'User 1',
      email: 'test1@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    };

    const res1 = await request.post(URL).send(body1);
    expect(res1.status).toBe(201);
    expect(res1.body.message).toBeDefined();

    const res2 = await request.post(URL).send(body2);
    expect(res2.status).toBe(201);
    expect(res2.body.message).toBeDefined();
  });

  it('should response with 400 status code on empty request body', async () => {
    const res = await request.post(URL).send({});
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on empty firstName property', async () => {
    const res = await request.post(URL).send({
      lastName: 'Alam',
      email: 'unsuccesstest@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on invalid firstName property with less than 3 characters long', async () => {
    const res = await request.post(URL).send({
      firstName: 'J',
      lastName: 'Alam',
      email: 'unsuccesstest@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on invalid firstName property with more than 30 characters long', async () => {
    const res = await request.post(URL).send({
      firstName: 'JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ',
      lastName: 'Alam',
      email: 'unsuccesstest@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on empty lastName property', async () => {
    const res = await request.post(URL).send({
      firstName: 'Janay',
      email: 'unsuccesstest@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on invalid lastName property with less than 3 characters long', async () => {
    const res = await request.post(URL).send({
      firstName: 'Janay',
      lastName: 'A',
      email: 'unsuccesstest@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on invalid lastName property with more than 30 characters long', async () => {
    const res = await request.post(URL).send({
      firstName: 'Janay',
      lastName: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      email: 'unsuccesstest@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on duplicate email address', async () => {
    const body = {
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'test@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    };
    await request.post(URL).send(body);
    const res = await request.post(URL).send(body);
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on empty email address', async () => {
    const res = await request.post(URL).send({
      firstName: 'Janay',
      lastName: 'Alam',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
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
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'unsuccesstest@gmail.com',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on password with less than 6 characters long', async () => {
    const res = await request.post(URL).send({
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'unsuccesstest@gmail.com',
      password: 'hihih',
      confirmPassword: 'hihih',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on empty confirm password', async () => {
    const res = await request.post(URL).send({
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'unsuccesstest@gmail.com',
      password: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on unmatched confirm password', async () => {
    const res = await request.post(URL).send({
      firstName: 'Janay',
      lastName: 'Alam',
      email: 'unsuccesstest@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjana',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });

  it('should response with 400 status code on unexpected request body property', async () => {
    const res = await request.post(URL).send({
      firstName: 'Janay',
      lastName: 'Alam',
      extra: 'extra-field',
      email: 'unsuccesstest@gmail.com',
      password: 'hiiamjanay',
      confirmPassword: 'hiiamjanay',
    });
    expect(res.status).toBe(400);
    expect(res.body.name).toBeDefined();
    expect(res.body.name).toBe('BadRequestError');
    expect(res.body.message).toBeDefined();
  });
});
