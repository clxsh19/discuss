import { Response, Request, NextFunction } from "express";

const ErrorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
      stack: process.env.NODE_ENV === 'development' ? err.stack : err.stack
  })
}

export default ErrorHandler;