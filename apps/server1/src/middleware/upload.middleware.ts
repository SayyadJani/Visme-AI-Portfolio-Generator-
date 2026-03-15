import { RequestHandler } from 'express';
import multer from 'multer';
import * as os from 'os';

/**
 * Store uploads in the system temp directory
 * Files are deleted after upload completes (in the service layer)
 */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, os.tmpdir()),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname}`);
  },
});

/**
 * Accept an optional thumbnail image
 */
export const templateUpload: RequestHandler = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max for thumbnail
  },
  fileFilter: (_req, file, cb) => {
    if (file.fieldname === 'thumbFile') {
      // Accept common image types for thumbnail
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('thumbFile must be an image'));
      }
    } else {
      cb(new Error(`Unexpected field: ${file.fieldname}`));
    }
  },
}).fields([
  { name: 'thumbFile', maxCount: 1 },
]);
