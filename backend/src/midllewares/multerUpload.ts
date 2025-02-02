import upload from "../config/multerConfig";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

const fileUpload = (req: Request, res: Response, next: NextFunction) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Handle specific Multer errors
      let message = "An error occurred while uploading the file.";
      
      if (err.code === "LIMIT_FILE_SIZE") {
        message = "File size exceeds the allowed limit.";
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        message = "Unexpected file field.";
      }

      return res.status(400).json({ message });
    } 
    
    if (err) {
      // Handle unknown errors (e.g., file format issues)
      return res.status(400).json({
        message: err.message || "Something went wrong with the file upload." 
      });
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
      let message = "An error occurred while uploading the files.";

      if (err.code === "LIMIT_FILE_SIZE") {
        message = "File size exceeds the allowed limit.";
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        message = "Unexpected file field.";
      }

      return res.status(400).json({ message });
    } 
    
    if (err) {
      return res.status(400).json({ 
        message: err.message || "Something went wrong with the file upload." 
      });
    }

    next();
  });
};

export { fileUpload, multipleFileUpload };
