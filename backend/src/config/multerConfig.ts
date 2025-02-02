import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

// Allowed file types (images & videos)
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "video/mp4", "video/mpeg"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Only images and videos are allowed!"));
  }

  if (file.size === 0) {
    return cb(new Error("File size cannot be 0 bytes."));
  }

  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

export default upload;
