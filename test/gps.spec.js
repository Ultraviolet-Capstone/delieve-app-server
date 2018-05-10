import request from 'supertest';  
import { expect } from 'chai';

import app from '../bin/www';

describe('GET /api/gps/', () => {  
  it('should respond with text message "Hello World"', (done) => {
    request(app)
      .get('/api/gps')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.text).to.equal('1');
        done();
      });
  });
});