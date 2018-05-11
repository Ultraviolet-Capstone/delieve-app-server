import request from 'supertest';  
import { expect } from 'chai';

import app from '../bin/www';


describe('GET /api/gps/1', () => {  
  it('should respond with object that has property "id": 1', (done) => {
    request(app)
      .get('/api/gps/1')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.body.id).to.equal(1);
        done();
      });
  });
});


describe('GET /api/gps/hello', () => {  
  it('should respond with object that has property "id": 1', (done) => {
    request(app)
      .get('/api/gps/hello')
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