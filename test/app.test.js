'use strict';

const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

/* eslint  no-unused-expressions: "off", global-require: "off" */
describe('server', () => {
  const server = require('../server');
  it('server.js file exists', () => {
    expect(server).to.exist;
  });
  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
});