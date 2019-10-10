import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import users from './mock/users';

const { expect } = chai;
chai.use(chaiHttp);
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
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(409);
        done();
      });
  });
});

describe('POST signin  successfully, api/v2/auth/signin', () => {
  it('should return Use is successfully logged in', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(users[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('User Is successfully Logged In');

        done();
      });
  });
});

describe('POST signin failed, api/v2/auth/signin', () => {
  it('should return signin error status', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(users[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Invalid Email or Password');
        done();
      });
  });
});

describe('POST signin with incomplete data, api/v2/auth/signin', () => {
  it('should return email is required', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[7])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"email" is required');
        done();
      });
  });
});

describe('POST signin with incomplete data, api/v2/auth/signin', () => {
  it('should return password is required', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[8])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"password" is required');
        done();
      });
  });
});

describe('POST signin with invalid email, api/v2/auth/signin', () => {
  it('should return email must be valid', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .send(users[9])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"email" must be a valid email');
        done();
      });
  });
});
