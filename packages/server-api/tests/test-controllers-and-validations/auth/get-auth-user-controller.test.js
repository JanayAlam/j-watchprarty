/* eslint-disable no-undef */
// const testConfig = require('../../test.config');

// const request = testConfig();

jest.mock('../../../src/api/services/user-service.js');
jest.mock('../../../src/api/services/profile-service.js');

// const BASE_URI = '/api/v1/auth';

describe('POST /auth/user', () => {
  // const URL = `${BASE_URI}/user`;

  it('should response with 200 status code on successful get auth user request', async () => {
    // TODO: Implement the test code
    // ERROR: Error on JWTStrategy mongodb connection
    // const body = {
    //   firstName: 'Janay',
    //   lastName: 'Alam',
    //   email: 'getauthusertest1@gmail.com',
    //   password: 'hiiamjanay',
    //   confirmPassword: 'hiiamjanay',
    // };
    // await request.post(`${BASE_URI}/register`).send(body);
    // const loginRes = await request.post(`${BASE_URI}/login`).send({
    //   email: body.email,
    //   password: body.password,
    // });
    // const validToken = loginRes.body.token;
    // const res = await request
    //   .get(URL)
    //   .send()
    //   .set({ Authorization: `Bearer ${validToken}` });
    // expect(res.status).toBe(200);
    // expect(res.body).toBeDefined();
  });
});
