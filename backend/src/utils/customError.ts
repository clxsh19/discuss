import { ValidationError } from "express-validator/src";

interface customErrorProps {
  detail: ValidationError[] | string;
  location: string;
}

class CustomError extends Error {
  statusCode?: number;
  custom?: customErrorProps

  constructor(message: string, statusCode = 400, custom?: customErrorProps) {
    super(message);
    this.statusCode = statusCode;
    this.custom = custom;
    
    // Object.setPrototypeOf(this, CustomError.prototype)
  }
}

export default CustomError;
