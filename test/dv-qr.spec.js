import request from 'supertest';  
import { expect } from 'chai';

import app from '../bin/www';

import errorMessage from '../common/error/error-message';

const FIXTURE = {
  QR_READY_GET: 'id=1&status=READY',
  QR_READY_POST:
    {
      id: 2,
      hashValue: '435a4625fa355b578980eae0027f0028',
      status: 'READY',
    },
  QR_READY_POST_FAIL:
    {
      id: 3,
      hashValue: 'unmatching_hash',
      status: 'READY',
    },
}

describe('get /api/qr?'+FIXTURE.QR_READY_GET, () => {  
  it('should respond with url "/api/qr/READY-1"', (done) => {
    request(app)
      .get('/api/qr?'+FIXTURE.QR_READY_GET)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.body.id).to.equal(1);
        expect(res.body.url).to.equal('/api/qr/READY-1');
        done();
      });
  });
});


describe('post /api/qr', () => {  
  it('should respond with obj that has key-value pairs "(id, 2), (status, "PROGRESS")"', (done) => {
    request(app)
      .post('/api/qr')
      .send(FIXTURE.QR_READY_POST)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.body.id).to.equal(2);
        expect(res.body.status).to.equal('PROGRESS');
        done();
      });
  });
});

describe('post /api/qr', () => {  
  it('should respond with error status 404, HASH UNMATCHED', (done) => {
    request(app)
      .post('/api/qr')
      .send(FIXTURE.QR_READY_POST_FAIL)
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.error.text).to.equal(errorMessage.HASH_UNMATCHED);
        done();
      });
  });
});