import multer, { MulterError } from 'multer';
import cloudinary from './cloudinaryConifg';
import { Request } from 'express';

const storage = multer.memoryStorage();
// Allowed file types (images & videos)
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/mpeg',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
  }

  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter,
});

const uploadToCloudinary = (fileBuffer: Buffer, fileName: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto', // Auto-detect image or video
          folder: 'uploads',
          public_id: fileName,
        },
        (error, result) => {
          if (error) reject(`Cloudinary upload failed: ${error.message}`);
          else resolve(result);
        },
      )
      .end(fileBuffer);
  });
};

export { upload, uploadToCloudinary };
