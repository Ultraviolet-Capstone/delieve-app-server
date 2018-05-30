import request from 'supertest';  
import { expect } from 'chai';

import app from '../bin/www';

var errorMessage = require('../common/error/error-message');


// accept matching
describe('POST /api/matching', () => {  
  it('should respond with code 200 and with property "delivererId" == 19', (done) => {
    request(app)
      .post('/api/matching')
      .send({ requestId: 327, delivererId: 19, time: '2018-05-03 00:00:01' })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.body.delivererId).to.equal(19);
        done();
      });
  });
});


// with mal-parameters, system will return error code 412
describe('POST /api/matching', () => {  
  it('should respond with code 412', (done) => {
    request(app)
      .post('/api/matching')
      .send({ requestId: 327, delivererId: 19 })
      .expect(412)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
      });
  });
});