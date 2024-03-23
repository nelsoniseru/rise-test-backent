import express from 'express';
import dotenv from 'dotenv' ;
import path from 'path'
dotenv.config({ path: path.join(__dirname, '.env') });
import AuthRoute from './auth/auth.route'
import UserRoute from './users/users.route'
import PostRoute from './posts/posts.route'
import AppConfig from './utils/configuration/config'
import DatabaseService from './utils/configuration/db'
import User from './users/users.model'
import Post from './posts/posts.model'
import Comment from './comments/comments.model'


const app = express();
 
const config = new AppConfig(app);
// config

DatabaseService.connect()
.then(async () => {
  // Synchronize all models with the database
  await DatabaseService.synchronizeAllModelsWithDatabase([User,Post,Comment]);
})
.catch((error) => {
  console.error('Database connection error:', error);
});


config.configuration();
// Routes
new AuthRoute(app).routes();
new UserRoute(app).routes()
new PostRoute(app).routes()

config.errorConfig();
config.startServer();

export {app}
