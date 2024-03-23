
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import {posts,auth,users} from '../../src/utils/constant/routes';
import { describe, it } from 'mocha';
import {app} from '../../src/server'; 
import DatabaseService from '../../src/utils/configuration/db'
const sequelize = DatabaseService.getSequelizeInstance();

chai.use(chaiHttp);

describe('UserController', () => {
  let authToken; 
  let user
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

      const profileResponse = await chai.request(app)
      .get(`${users}/profile`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`) 



    // Extract the token from the login response
    authToken = loginResponse.body.token;
    user = profileResponse.body.users.id
   

  });

  after(async () => {
    // Unsync the test database after all tests have been run
    await sequelize.drop();
  });
 

  it('should create a new post', (done) => {
    chai.request(app)
      .post(`${posts}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Post',
        content: 'This is a test post',
        userId:user.id
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('post');
        done();
      });
  });

  it('should get all posts', (done) => {
    chai.request(app)
      .get(`${posts}`)
      .set('Authorization', `Bearer ${authToken}`) 
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('posts');
        done();
      });
  });
});
