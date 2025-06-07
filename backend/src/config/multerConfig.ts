import multer, { MulterError } from 'multer';
import { Request } from 'express';
import cloudinary from './cloudinaryConifg';

// Define the file interface explicitly
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

const storage = multer.memoryStorage();

// Allowed file types (images & videos)
const fileFilter = (
  req: Request,
  file: MulterFile,
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
    return cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'Invalid file type'));
  }

  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1 // Limit to 1 file per upload
  },
  fileFilter: fileFilter as any, // Type assertion to bypass the type issue
});

const uploadToCloudinary = (fileBuffer: Buffer, fileName: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto',
          folder: 'uploads',
          public_id: fileName,
        },
        (error, result) => {
          if (error) reject(new Error(`Cloudinary upload failed: ${error.message}`));
          else resolve(result);
        },
      )
      .end(fileBuffer);
  });
};

export { upload, uploadToCloudinary };
