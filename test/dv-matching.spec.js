import request from 'supertest';  
import { expect } from 'chai';

import app from '../bin/www';

var errorMessage = require('../common/error/error-message');

describe('POST /api/matching/deliverer', () => {  
  before(() => {
    var pool = require('../common/database/mysql'); 
    pool.generatePool();
    const query = `
    UPDATE dv_deliverer d
    SET d.status = ?
    WHERE d.id = ?; 
    `;

    const parameters = ['OFF', 1];
    return pool.query(query, parameters)
  })
  it('should respond with object that has property "status": ON, latitude: 37.4445, longitude: 127.49492', (done) => {
    request(app)
      .post('/api/matching/deliverer')
      .send({ delivererId: 1, status: 'ON', latitude: 37.4445, longitude: 127.49492 })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect((res.body.status)).to.equal('ON');
        expect((res.body.longitude)).to.equal(127.49492);
        expect((res.body.latitude)).to.equal(37.4445);
        done();
      });
  });
});


describe('POST /api/matching/deliverer', () => {  
  it('should respond with error code 500 there is no such id', (done) => {
    request(app)
      .post('/api/matching/deliverer')
      .send({ delivererId: 2, status: 'ON', latitude: 37.4445, longitude: 127.49492 })
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