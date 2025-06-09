import { upload, uploadToCloudinary } from '../config/multerConfig';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import CustomError from '../utils/customError';

const generateFileName = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const handleMulterError = (err: any, location: string, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    let message = 'An error occurred while uploading the file.';
    if (err.code === 'LIMIT_FILE_SIZE')
      message = 'File size exceeds the allowed limit.';
    if (err.code === 'LIMIT_UNEXPECTED_FILE')
      message = 'Unexpected file field.';

    return next(
      new CustomError('File Upload Error', 400, {
        errors: err.message || message,
        location,
      }),
    );
  }

  return next(
    new CustomError('File Upload Error', 415, {
      errors: err.message || 'Something went wrong with the file upload.',
      location,
    }),
  );
};

const handleUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
  location: string,
) => {
  try {
    const files = req.file
      ? [req.file]
      : Object.values(
          (req.files as { [fieldname: string]: Express.Multer.File[] }) || {},
        ).flat();

    if (!files.length) return next();

    for (const file of files) {
      const fileName = generateFileName();
      const result = await uploadToCloudinary(file.buffer, fileName);
      file.cloudinary = result;
    }

    next();
  } catch (err: any) {
    return next(
      new CustomError('Cloudinary Error', 500, {
        errors: err.message || 'Cloudinary upload error',
        location,
      }),
    );
  }
};

const fileUpload = (req: Request, res: Response, next: NextFunction) => {
  upload.single('file')(req, res, async (err) => {
    if (err) return handleMulterError(err, 'middleware/fileUpload', next);
    await handleUpload(req, res, next, 'middleware/fileUpload');
  });
};

const multipleFileUpload = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('=== FILE DEBUG INFO ===');
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Content-Length:', req.headers['content-length']);

  // Log form data keys if available
  if (req.body) {
    console.log('Body keys:', Object.keys(req.body));
  }
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ])(req, res, async (err) => {
    console.log(req.files);
    if (err)
      return handleMulterError(err, 'middleware/multipleFileUpload', next);
    await handleUpload(req, res, next, 'middleware/multipleFileUpload');
  });
};
export { fileUpload, multipleFileUpload };
