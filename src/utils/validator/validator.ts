import { body, param } from 'express-validator'

const validateLoginUserInput = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 }).withMessage('password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('password must contain at least one special character')
  
];

const validateRegisterUserInput = [
  body('name')
  .notEmpty()
  .withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 }).withMessage('password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('password must contain at least one special character')
  
];

const validatePostInput = [
  body('title')
  .notEmpty()
  .withMessage('title is required'),
  body('content')
  .notEmpty()
  .withMessage('content is required'),  
];
const validateCommentInput = [
  body('content')
  .notEmpty()
  .withMessage('content is required'),

];
export  {
  validateRegisterUserInput ,
  validateLoginUserInput,
  validatePostInput,
  validateCommentInput
  
};
