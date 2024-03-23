import express, { Express } from 'express';

import {
  validateRegisterUserInput ,
  validateLoginUserInput,
} from '../utils/validator/validator'
import AuthController from './auth.controller'
import AuthService from './auth.service'
import { auth } from '../utils/constant/routes'
const authController = new AuthController(AuthService);

class AuthRoutes {
private app: Express;
  constructor(app) {
    this.app = app;
  }

  async routes() {

    this.app.post(`${auth}/register`, 
    validateRegisterUserInput, 
    (req, res,next) => authController.PostRegister(req, res,next)); 

    this.app.post(`${auth}/login`,
    validateLoginUserInput, 
    (req, res) => authController.PostLogin(req, res)); 
  }
}

  export default AuthRoutes;
