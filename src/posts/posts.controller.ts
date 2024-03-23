
import {checkError} from '../utils/helper/inputFieldError'

import {
    statusCodeBadRequest,
    statusCodeOk,
   
   } from '../utils/constant/status-code'
    class PostController {
    private postService:any
    constructor(postService) {
      this.postService = postService;
    }
    async PostCreateNewPost(req, res, next) {
      try {
        const {title,content} = req.body
        const { user } = req;
        const errors = checkError(req);
        const errMsg = errors.mapped()
        if(!errors.isEmpty()) return res.status(statusCodeBadRequest).json({message:errMsg});
        const post = await this.postService.PostCreateNewPost(title,content,user);
        return res
          .status(statusCodeOk)
          .json({ status: true, message:"post created successfully", post });
      } catch (error) {
        console.log(error)
      res.status(statusCodeBadRequest).json({status:false,message:error.message});
      }
    }
    
    async GetPosts(req, res, next) {
      try {
        const { user } = req;
        const posts = await this.postService.GetPosts(user);
        return res
          .status(statusCodeOk)
          .json({ status: true, message:"posts found successfully", posts });
      } catch (error) {
      res.status(statusCodeBadRequest).json({status:false,message:error.message});
      }
    }
    async PostCreateComment(req, res, next) {
      try {
        const {content} = req.body
        const {postId} = req.params
        const { user } = req;
        const errors = checkError(req);
        const errMsg = errors.mapped()
        if(!errors.isEmpty()) return res.status(statusCodeBadRequest).json({message:errMsg});
        const newComment = await this.postService.PostCreateComment(content,postId,user);
        return res
          .status(statusCodeOk)
          .json({ status: true, message:"post created successfully", newComment});
      } catch (error) {
      res.status(statusCodeBadRequest).json({status:false,message:error.message});
      }
    }
    
    
   }
   
   export default  PostController;
   