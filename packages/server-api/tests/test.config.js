const supertest = require('supertest');
const app = require('../src/app');

const config = () => supertest(app);

module.exports = config;
