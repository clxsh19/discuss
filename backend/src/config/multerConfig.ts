import multer, { MulterError } from 'multer';
import path from 'path';
import cloudinary from './cloudinaryConifg';

// const storage = multer.diskStorage({
//   destination: process.env.MEDIA_API_URL,
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//   }
// });
const storage = multer.memoryStorage();
// Allowed file types (images & videos)
const fileFilter = (
  req: Express.Request,
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

  if (file.size === 0) {
    return cb(new MulterError('LIMIT_FILE_SIZE'));
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
