import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import users from '../model/user';

const { expect } = chai;

chai.use(chaiHttp);

// Let's first grab the faked user info
const fname = users[0].firstName;
const lname = users[0].lastName;
const { email } = users[0];
// eslint-disable-next-line no-unused-vars
let token;

// incorect route test

// ############ SIGNUP TEST ############

// Test signup for the user
describe('POST sign up with whitespaced first_name, api/v1/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[10])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('"firstName" must only contain alpha-numeric characters');
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});

describe('POST sign up with whitespaced last_name, api/v1/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[11])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});
describe('POST sign up successfully, api/v1/auth/signup', () => {
  it('should return signup successful', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.equal(' User Created Successfully');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.firstName).to.equal(fname);
        expect(res.body.data.lastName).to.equal(lname);
        expect(res.body.data.email).to.equal(email);

        done();
      });
  });
});
describe('POST email already exist, api/v2/auth/signup', () => {
  it('should return {email} already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(409);
        expect(res.body.error).to.equal(`${email} is already taken!`);
        done();
      });
  });
});
