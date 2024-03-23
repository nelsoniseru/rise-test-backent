

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import {auth} from '../../src/utils/constant/routes';
import { describe, it } from 'mocha';
import {app} from '../../src/server'; 
import DatabaseService from '../../src/utils/configuration/db'
const sequelize = DatabaseService.getSequelizeInstance();
chai.use(chaiHttp);

describe('AuthController', () => {
        before(async () => {
          // Sync the test database before running tests
          await sequelize.sync({ force: true }); 
        });
      
        after(async () => {
          // Unsync the test database after all tests have been run
          await sequelize.drop();
        });
  it('should register a new user', (done) => {
    chai.request(app)
      .post(`${auth}/register`)
      .send({
        email:'test@gmail.com',
        name:'Test User',
        password:'Password@123',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should return 400 for login with invalid credentials ', (done) => {
    chai.request(app)
      .post(`${auth}/login`)
      .send({
        email:'test@gmail.com',
        password:'Password@123',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
  it('should login an existing user', (done) => {
    chai.request(app)
      .post(`${auth}/login`)
      .send({
        email: 'invalid@gmail.com',
        password: 'Invalid@123',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').eql('Invalid email or password..');
        done();
      });
  });
});
