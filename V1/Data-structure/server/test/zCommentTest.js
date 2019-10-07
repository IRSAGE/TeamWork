import chai from 'chai';

import chaiHttp from 'chai-http';
import users from '../model/user';
import app from '../index';

import comments from '../model/comments';
import generateToken from '../helpers/tokens';

const { expect } = chai;

chai.use(chaiHttp);

const token = generateToken.generateToken(1, users[0].email);

describe('POST /api/v1/articles/:articleId/comments adding comment', () => {
  it('should return comment successfully added', (done) => {
    chai.request(app)
      .post('/api/v1/articles/1/comments')
      .set('Accept', 'application/json')
      .set('token', token)
      .send(comments[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('comment successfully added');
        done();
      });
  });
});

describe('POST /api/v1/articles/:articleId/comments adding comment', () => {
  it('should return no article found ', (done) => {
    chai.request(app)
      .post('/api/v1/articles/3/comments')
      .set('Accept', 'application/json')
      .set('token', token)
      .send(comments[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
});

describe('GET api/v1/articles/:articleId Get article by Id', () => {
  it('should return acertain article', (done) => {
    chai.request(app)
      .get('/api/v1/articles/1')
      .set('token', token)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});

describe('GET api/v1/articles/:articleId Get article by Id', () => {
  it('should return acertain article on error', (done) => {
    chai.request(app)
      .get('/api/v1/articles/3')
      .set('token', token)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
});

// delete article

describe('DELETE api/v1/articles/:articleId article ', () => {
  it('should return no article found to delete', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/3')
      .set('Accept', 'application/json')
      .set('token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
});

describe('DELETE api/v1/articles/:articleId article ', () => {
  it('should return article successfully deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/1')
      .set('Accept', 'application/json')
      .set('token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal(' article successfully deleted');
        done();
      });
  });
});

describe('GET api/v1/feeds Get all articles ', () => {
  it('should return an array of All artiles ', (done) => {
    chai.request(app)
      .get('/api/v1/feeds')
      .set('Accept', 'application/json')
      .set('token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
});
