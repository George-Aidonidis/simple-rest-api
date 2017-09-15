'use strict';

const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');

const expect = chai.expect;
const dummyObject = {
  title: 'myTitle',
  content: 'some content here'
};
/* eslint  no-unused-expressions: "off",
  global-require: "off",
  no-underscore-dangle: off */
describe('server', () => {
  let noteId;
  before((done) => {
    mongoose.connection.db.dropDatabase(done);
  });
  const server = require('../server');
  it('server.js file exists', () => {
    expect(server).to.exist;
  });
  it('POST /note', () => request(server).post('/note')
    .send(dummyObject)
    .expect(200)
    .then(res => {
      noteId = res.body._id;
      expect(res.body.title).to.equal(dummyObject.title);
      expect(res.body.content).to.equal(dummyObject.content);
    })
  );
  it('GET /', () => request(server).get('/')
    .expect(200)
    .then(res => {
      expect(res.body).to.be.an('Array');
      expect(res.body[0].title).to.equal(dummyObject.title);
      expect(res.body[0].content).to.equal(dummyObject.content);
    })
  );
  it('GET /note/:id', () => request(server).get(`/note/${noteId}`)
    .expect(200)
    .then(res => {
      expect(res.body.title).to.equal(dummyObject.title);
      expect(res.body.content).to.equal(dummyObject.content);
    })
  );
  it('PATCH /note/:id', () => request(server).patch(`/note/${noteId}`)
    .send({ title: 'updatedTitle' })
    .expect(200)
    .then(res => {
      expect(res.body.title).to.equal('updatedTitle');
      expect(res.body.content).to.equal(dummyObject.content);
    })
  );
  it('DELETE /note/:id', () => request(server).delete(`/note/${noteId}`).expect(200));
});