import multer, { MulterError } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: process.env.MEDIA_API_URL,
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

// Allowed file types (images & videos)
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "video/mp4", "video/mpeg"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new MulterError("LIMIT_UNEXPECTED_FILE"));
  }

  if (file.size === 0) {
    return cb(new MulterError("LIMIT_FILE_SIZE"));
  }

  cb(null, true);
};


const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

export default upload;
