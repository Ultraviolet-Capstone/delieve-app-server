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
  it('should respond with object that has property "accessToken" and with property "userInfo.delivable" : 0', (done) => {
    request(app)
      .get('/auth/user/login?token=123')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect((res.body.accessToken !== '')).to.equal(true);
        expect(res.body.userInfo.delivable).to.equal(0);
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


describe('POST /auth/user/register', () => {  
  before(() => {
    var pool = require('../common/database/mysql');
    pool.generatePool();
    const query = `
    DELETE FROM dv_user WHERE token = ?;
    `;

    const parameters = [1111111];
    return pool.query(query, parameters)
  })
  it('should respond status is 200', (done) => {
    request(app)
      .post('/auth/user/register')
      .send({
        name: 'HYUNSU',
        phone: '010-1111-1111',
        email: 'dogfooter219@gmail.com',
        birthday: 960219,
        token: 1111111,
        tokenProvider: 'kakao',
        providerSelfiURL: '/sefi',
        providerNickname: 'hyunsu_',
        gender: 'male'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
      });
  });
}); 


// duplicated token
describe('POST /auth/user/register', () => {  
  it('should respond status is 500 this is duplicated data', (done) => {
    request(app)
      .post('/auth/user/register')
      .send({
        name: 'HYUNSU',
        phone: '010-1111-1111',
        email: 'dogfooter219@gmail.com',
        birthday: 960219,
        token: 1111111,
        tokenProvider: 'kakao',
        providerSelfiURL: '/sefi',
        providerNickname: 'hyunsu_',
        gender: 'male'
      })
      .expect(500)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
      });
  });
}); 