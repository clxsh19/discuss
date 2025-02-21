import { Response, Request, NextFunction } from "express";
import CustomError from "../utils/customError";  // Ensure correct path

const ErrorHandler = (err: Error & Partial<CustomError>, req: Request, res: Response, next: NextFunction) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    details: err.custom || {},
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default ErrorHandler;
