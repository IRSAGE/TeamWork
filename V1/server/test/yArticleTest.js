import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';


import users from '../../../V2/server/test/mock/users';
import articles from '../../../V2/server/test/mock/articles';
import generateToken from '../helpers/tokens';

const { expect } = chai;

chai.use(chaiHttp);

// ############ ARTICLE TESTS ############

// Create a true token for testing
const token = generateToken.generateToken(1, users[0].email);
// Create a token with invalid user
const notoken = ' ';
const notusertoken = generateToken.generateToken(1, 'mmmnnnndj@gamil.com');
const invalidtoken = 'ydhdhdijdhndhdgdgd';
// creating an article with title missing

describe('POST api/v1/articles title is missing', () => {
  it('should return title is required', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
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

describe('POST api/v1/articles creating an article', () => {
  it('should return an article is created successfully', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
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

describe('POST api/v1/articles creating an article with no token', () => {
  it('should return an article creation  failed', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .send(articles[3])
      .set('token', notoken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});

describe('POST api/v1/articles creating an article with not a user email', () => {
  it('should return an article creation  failed', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .send(articles[3])
      .set('token', notusertoken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        done();
      });
  });
});

describe('POST api/v1/articles creating an article with an invalid token', () => {
  it('should return an article creation  failed', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .send(articles[3])
      .set('token', invalidtoken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
});

// edit article

describe('PATCH api/v1/articles/:articleId article ', () => {
  it('should return article successfully edited', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/1')
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

describe('PATCH api/v1/articles/:articleId article ', () => {
  it('should return articleid not found', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/3')
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
