/* eslint-disable no-undef */
const testConfig = require('./test.config');

const request = testConfig();

// the basic error testing
describe('error test suite', () => {
  it('should throw NotFoundError', async () => {
    const response = await request.get('/unknown-url');
    expect(response.status).toBe(404);
    expect(response.body.name).toBe('NotFoundError');
  });
});
