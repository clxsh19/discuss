import { Request } from 'express';
import { validationResult } from "express-validator";
import CustomError from './customError';

const handleValidationErrors = (req: Request, location: string): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError('Validation Error', 400, {
      errors: errors.array(),
      location,
    });
  }
};

export default handleValidationErrors;
