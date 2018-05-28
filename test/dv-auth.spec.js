import request from 'supertest';  
import { expect } from 'chai';

import app from '../bin/www';

var errorMessage = require('../common/error/error-message');

// 성공 케이스
describe('GET /auth/admin/token?userName=admin&password=admin&grantType=password', () => {  
  it('should respond with object that has property "accessToken"', (done) => {
    request(app)
      .get('/auth/admin/token?userName=admin&password=admin&grantType=password')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect((res.body.accessToken !== '')).to.equal(true);
        done();
      });
  });
});

// WRONG GRANT TYPE
describe('GET /auth/admin/token?userName=admin&password=admin&grantType=password1', () => {  
  it('should respond status is 403', (done) => {
    request(app)
      .get('/auth/admin/token?userName=admin&password=admin&grantType=password1')
      .expect(403)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.body.message).to.equal(errorMessage.PERMISION_DENY);
        done();
      });
  });
});

// wrong id
describe('GET /auth/admin/token?userName=admin_123&password=admin&grantType=password', () => {  
  it('should respond status is 404', (done) => {
    request(app)
      .get('/auth/admin/token?userName=admin_123&password=admin&grantType=password')
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.body.message).to.equal(errorMessage.WRONG_ID);
        done();
      });
  });
});

describe('GET /auth/admin/token?userName=admin&password=admin_123&grantType=password', () => {  
  it('should respond status is 404', (done) => {
    request(app)
      .get('/auth/admin/token?userName=admin&password=admin_123&grantType=password')
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.body.message).to.equal(errorMessage.WRONG_PASSWORD);
        done();
      });
  });
});


describe('GET /auth/user/login?token=123', () => {  
  it('should respond with object that has property "accessToken"', (done) => {
    request(app)
      .get('/auth/user/login?token=123')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect((res.body.accessToken !== '')).to.equal(true);
        done();
      });
  });
});


describe('GET /auth/user/login?token=1', () => {  
  it('should respond status is 404', (done) => {
    request(app)
      .get('/auth/user/login?token=1')
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
      });
  });
});