import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';


import users from '../model/users';
import articles from '../../../V1/server/model/articles';

import generateToken from '../../../V1/server/helpers/tokens';

const { expect } = chai;

chai.use(chaiHttp);

const token = generateToken.generateToken(1, users[0].email);
const notoken = ' ';
const invalidtoken = 'ydhdhdijdhndhdgdgd';

describe('POST api/v2/articles title is missing', () => {
  it('should return title is required', (done) => {
    chai.request(app)
      .post('/api/v2/articles')
      .set('token', token)
      .send(articles[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"title" is required');
        done();
      });
  });
});

describe('POST api/v2/articles creating an article', () => {
  it('should return an article is created successfully', (done) => {
    chai.request(app)
      .post('/api/v2/articles')
      .set('Accept', 'application/json')
      .send(articles[3])
      .set('token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal(' article successfully created');
        done();
      });
  });
});

describe('POST api/v2/articles creating an article with no token', () => {
  it('should return an article creation  failed', (done) => {
    chai.request(app)
      .post('/api/v2/articles')
      .set('Accept', 'application/json')
      .send(articles[3])
      .set('token', notoken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        done();
      });
  });
});

describe('POST api/v2/articles creating an article with an invalid token', () => {
  it('should return an article creation  failed', (done) => {
    chai.request(app)
      .post('/api/v2/articles')
      .set('Accept', 'application/json')
      .send(articles[3])
      .set('token', invalidtoken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        done();
      });
  });
});
describe('PATCH api/v2/articles/:articleId article ', () => {
  it('should return article successfully edited', (done) => {
    chai.request(app)
      .patch('/api/v2/articles/1')
      .set('Accept', 'application/json')
      .send(articles[3])
      .set('token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('article successfully edited');
        done();
      });
  });
});

describe('PATCH api/v2/articles/:articleId article ', () => {
  it('should return articleid not found', (done) => {
    chai.request(app)
      .patch('/api/v2/articles/39')
      .set('Accept', 'application/json')
      .send(articles[3])
      .set('token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
});
