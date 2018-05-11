import request from 'supertest';  
import { expect } from 'chai';

import app from '../bin/www';

// POST /api/requet
const apiRequestBody = {
  beginLocation: {
    address: 'HYUNSU ZIP',
    gps: {
      latitude: 129,
      longitude: 33
    }
  },
  finishLocation: {
    address: 'SEOUL LAND',
    gps: {
      latitude: 111,
      longitude: 39
    }
  },
  beginTime: new Date(),
  finishTime: new Date((new Date).getTime() + 2222),
  senderId: 22,
  stuff: {
    name: '5 bucks',
    size: 'S',
    weight: 0.22,
    stuffCode: 1
  }
}
const apiRequestBody2 = {
  beginLocation: {
    address: 'HYUNSU ZIP',
    gps: {
      longitude: 33
    }
  },
  finishLocation: {
    address: 'SEOUL LAND',
    gps: {
      latitude: 111,
      longitude: 39
    }
  },
  beginTime: new Date(),
  finishTime: new Date((new Date).getTime() + 2222),
  senderId: 22,
  stuff: {
    name: '5 bucks',
    size: 'S',
    weight: 0.22,
    stuffCode: 1
  }
}


describe('POST /api/uv-request', () => {  
  it('should respond with code 200', (done) => {
    request(app)
      .post('/api/uv-request')
      .send(apiRequestBody)
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

describe('POST /api/uv-request', () => {  
  it('should respond with code 500', (done) => {
    request(app)
      .post('/api/uv-request')
      .send(apiRequestBody2)
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