import upload from "../config/multerConfig";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

const fileUpload = (req: Request, res: Response, next: NextFunction) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ message: `Multer Error: ${err.message}` });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json({ message: `Unknown Error: ${err.message}` });
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
      return res.status(400).json({ message: `Multer Error: ${err.message}` });
    } else if (err) {
      return res.status(500).json({ message: `Unknown Error: ${err.message}` });
    }
    next();
  });
};

export {
  fileUpload,
  multipleFileUpload,
};