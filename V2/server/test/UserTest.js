import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import users from '../model/users';

const { expect } = chai;

chai.use(chaiHttp);
// ############ SIGNUP TEST ############

// Test signup for the user
describe('POST sign up with whitespaced first_name, api/v2/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(users[10])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('"first_name" must only contain alpha-numeric characters');
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});

describe('POST sign up with whitespaced last_name, api/v2/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(users[11])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});
describe('POST sign up successfully, api/v2/auth/signup', () => {
  it('should return signup successful', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal('User Created Successfully');
        done();
      });
  });
});
describe('POST email already exist, api/v2/auth/signup', () => {
  it('should return {email} already exists', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(users[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(409);
        done();
      });
  });
});
