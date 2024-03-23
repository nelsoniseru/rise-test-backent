   import {checkError} from '../utils/helper/inputFieldError'

   import {
    statusCodeBadRequest,
    statusCodeCreated,
} from '../utils/constant/status-code'
    class AuthController {
    private authService:any
    constructor(authService) {
      this.authService = authService;
    }
    async PostRegister(req, res, next) {
      try {
         const{ email,name, password } = req.body
        const errors = checkError(req);
        const errMsg = errors.mapped()
        if(!errors.isEmpty()) return res.status(statusCodeBadRequest).json({message:errMsg});
        const token = await this.authService.PostRegister(email,name,password);
        return res
          .status(statusCodeCreated)
          .json({ status: true, message:"user created successfully", token });
      } catch (error) {
      res.status(statusCodeBadRequest).json({status:false,message:error.message});
      }
    }
    
  
    async PostLogin(req, res) {
      try {
        const{ email, password } = req.body
        const errors = checkError(req);
        const errMsg = errors.mapped()
        if(!errors.isEmpty()) return res.status(statusCodeBadRequest).json({message:errMsg});
        const token = await this.authService.PostLogin(email,password);
  
        return res
          .status(200)
          .json({ status: true, message:"login successfully",token });
      } catch (error) {
        
        return res
          .status(400)
          .json({ status: false, message: error.message });
      }
    }
  
  
    
    
  }
  
 export default  AuthController;
  