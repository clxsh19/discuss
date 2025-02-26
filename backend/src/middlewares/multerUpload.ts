import upload from "../config/multerConfig";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import CustomError from "../utils/customError"; // Ensure you import your CustomError

const fileUpload = (req: Request, res: Response, next: NextFunction) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      let message = "An error occurred while uploading the file.";

      if (err.code === "LIMIT_FILE_SIZE") {
        message = "File size exceeds the allowed limit.";
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        message = "Unexpected file field.";
      }

      return next(new CustomError("File Upload Error", 400, {
        errors: message,
        location: "middleware/fileUpload"
      }));
    } 

    if (err) {
      return next(new CustomError("File Upload Error", 415, {
        errors: err.message || "Something went wrong with the file upload.",
        location: "middleware/fileUpload"
      }));
    }

    next();
  });
};

const multipleFileUpload = (req: Request, res: Response, next: NextFunction) => {
  const uploadFields = upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]);

  uploadFields(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      let message = err.message;

      if (err.code === "LIMIT_FILE_SIZE") {
        message = "File size exceeds the allowed limit.";
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        message = "Unexpected file field.";
      }
      // message=err.message;
      return next(new CustomError("File Upload Error", 400, {
        errors: message,
        location: "middleware/multipleFileUpload"
      }));
    } 
    
    if (err) {
      return next(new CustomError("File Upload Error", 400, {
        errors: err.message || "Something went wrong with the file upload.",
        location: "middleware/multipleFileUpload"
      }));
    }

    next();
  });
};

export { fileUpload, multipleFileUpload };
