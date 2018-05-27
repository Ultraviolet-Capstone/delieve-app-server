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
  it('should respond with object that has property "status": ON', (done) => {
    request(app)
      .post('/api/matching/deliverer')
      .send({ delivererId: 1, status: 'ON' })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        console.log(res.body)
        expect((res.body.status)).to.equal('ON');
        done();
      });
  });
});


describe('POST /api/matching/deliverer', () => {  
  it('should respond with error code 500 there is no such id', (done) => {
    request(app)
      .post('/api/matching/deliverer')
      .send({ delivererId: 2, status: 'ON' })
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