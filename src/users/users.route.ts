import express, { Express } from 'express';

import UserController from './users.controller'
import UserService from './user.service'
import { users } from '../utils/constant/routes'
const userController = new UserController(UserService);
import {
  authenticateToken
} from '../utils/middleware/middleware'
class UserRoutes {
private app: Express;
  constructor(app) {
    this.app = app;
  }

  async routes() {

    this.app.get(`${users}`, 
    (req, res,next) => userController.GetUsers(req, res,next)); 
    this.app.get(`${users}/profile`, 
    authenticateToken,
    (req, res,next) => userController.GetUser(req, res,next)); 
    this.app.get(`${users}/top-user`, 
    (req, res,next) => userController.GetTopUserWithMostComment(req, res,next)); 
}
}
  export default UserRoutes;
