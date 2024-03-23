import { validationResult } from 'express-validator';

const checkError = (req) => {
    const errors = validationResult(req);
    return errors;
  };

  export {
    checkError
  }