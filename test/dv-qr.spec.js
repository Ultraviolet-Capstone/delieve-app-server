import request from 'supertest';  
import { expect } from 'chai';

import app from '../bin/www';


const FIXTURE = {
  QR_READY_GET: 'id=1&status=READY',
}

describe('get /api/qr?'+FIXTURE.QR_READY_GET, () => {  
  it('should respond with url "/api/qr/READY-1"', (done) => {
    request(app)
      .get('/api/qr?'+FIXTURE.QR_READY_GET)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(res)
          done(err);
          return;
        }

        expect(res.body.id).to.equal(1);
        expect(res.body.url).to.equal('/api/qr/READY-1');
        done();
      });
  });
});