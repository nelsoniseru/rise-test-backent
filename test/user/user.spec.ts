import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import {posts,auth,users} from '../../src/utils/constant/routes';
import { describe, it } from 'mocha';
import {app} from '../../src/server'; 
import DatabaseService from '../../src/utils/configuration/db'
const sequelize = DatabaseService.getSequelizeInstance();

chai.use(chaiHttp);
let authToken; 
  let user
describe('UserController', () => {
  before(async () => {

 // Sync the test database before running tests
 await sequelize.sync({ force: true }); 

 // Register a user
 await chai.request(app)
.post(`${auth}/register`)
.send({
  email:'test@gmail.com',
  name:'Test User',
  password:'Password@123',
})

 // Login with the registered user to obtain the token
 const loginResponse = await chai.request(app)
   .post(`${auth}/login`)
   .send({
     email:'test@gmail.com',
     password:'Password@123',
   });

 // Extract the token from the login response
 authToken = loginResponse.body.token;
});
after(async () => {
  // Unsync the test database after all tests have been run
  await sequelize.drop();
});
  it('should get all users', (done) => {
    chai.request(app)
      .get(`${users}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('users');
        done();
      });
  });

  it('should get top users with most comments', (done) => {
    chai.request(app)
      .get(`${users}/top-user`)
      .set('Authorization', `Bearer ${authToken}`) 
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('topuser');
        done();
      });
  });
});
