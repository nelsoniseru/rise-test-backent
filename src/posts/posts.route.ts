import express, { Express } from 'express';

import PostController from './posts.controller'
import PostService from './posts.service'
import {posts} from '../utils/constant/routes'
const postController = new PostController(PostService);
import {
  validatePostInput,
  validateCommentInput
} from '../utils/validator/validator'

import {
  authenticateToken
} from '../utils/middleware/middleware'

class PostRoutes {
private app: Express;
  constructor(app) {
    this.app = app;
  }

  async routes() {
    this.app.post(`${posts}`, 
    validatePostInput,
    authenticateToken,
    (req, res,next) => postController.PostCreateNewPost(req,res,next)); 

    this.app.get(`${posts}`, 
    authenticateToken,
    (req, res,next) => postController.GetPosts(req,res,next)); 
    this.app.post(`${posts}/:postId/comments`, 
    validateCommentInput,
    authenticateToken,
    (req, res,next) => postController.PostCreateComment(req,res,next)); 

    
}
}
  export default PostRoutes;
