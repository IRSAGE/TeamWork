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
