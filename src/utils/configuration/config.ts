import express, { Express,Request, Response, NextFunction } from 'express';
import cors from 'cors';
import {Error} from '../helper/error'
class AppConfig {
 private app: Express;
  constructor(app) {
    this.app = app;
  }

  async configuration() {
    this.app.use(cors());
    this.app.use(express.json());
  
  }

  async errorConfig() {
   
      this.app.use((req:Request, res:Response, next:NextFunction) => {
        const error = new Error( 404 , req.path + " " +  "not found")
        console.log(error.statusCode)
        res.status(error.statusCode || 500).json({ status: error.statusCode, message:error.message})
      })
  
    
  }

  async startServer() {
    const PORT = process.env.PORT || process.env.SERVER_PORT;
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

export default AppConfig;