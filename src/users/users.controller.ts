

import {
 statusCodeBadRequest,
 statusCodeOk,

} from '../utils/constant/status-code'
 class UserController {
 private userService:any
 constructor(authService) {
   this.userService = authService;
 }
 async GetUsers(req, res, next) {
   try {
    const users = await this.userService.GetUsers();
     return res
       .status(statusCodeOk)
       .json({ status: true, message:"users found successfully", users });
   } catch (error) {
   res.status(statusCodeBadRequest).json({status:false,message:error.message});
   }

 }
 async GetUser(req, res, next) {
  try {
    const {user} = req
   const users = await this.userService.GetUser(user);
    return res
      .status(statusCodeOk)
      .json({ status: true, message:"users found successfully", users });
  } catch (error) {
  res.status(statusCodeBadRequest).json({status:false,message:error.message});
  }

}


 async GetTopUserWithMostComment(req,res,next){
  try {
    const topuser = await this.userService.GetTopUserWithMostComment();
     return res
       .status(statusCodeOk)
       .json({ status: true, message:"top users found successfully", topuser });
   } catch (error) {
   res.status(statusCodeBadRequest).json({status:false,message:error.message});
   }
 }
 
}

export default  UserController;
