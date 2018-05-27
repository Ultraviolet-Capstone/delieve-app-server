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


describe('POST /api/gps/tracking', () => {  
  it('should respond with latitude: 37, longitude: 127.22, matchingId: 4', (done) => {
    request(app)
      .post('/api/gps/tracking')
      .send({ latitude: 37, longitude: 127.22, sensedTime: (new Date()), matchingId: 4 })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.body.latitude).to.equal(37);
        expect(res.body.longitude).to.equal(127.22);
        expect(res.body.matchingId).to.equal(4);
        done();
      });
  });
});


describe('GET /api/gps/tracking/5', () => {  
  it('should respond with list of length 5 and data matchingId: 5', (done) => {
    request(app)
      .get('/api/gps/tracking/5')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.body.gpsList.length).to.equal(5);
        expect(res.body.matchingId).to.equal(5);
        done();
      });
  });
});


describe('GET /api/gps/tracking/1', () => {  
  it('should respond with list of length 0 and data matchingId: 1', (done) => {
    request(app)
      .get('/api/gps/tracking/1')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res.body.gpsList.length).to.equal(0);
        expect(res.body.matchingId).to.equal(1);
        done();
      });
  });
});