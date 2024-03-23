class Error {
    public message:any;
    public statusCode:number;
    constructor(statusCode:number,message:any) {
        this.statusCode = statusCode;
        this.message = message;
         
      } 
  
    }
  
  
export {Error};