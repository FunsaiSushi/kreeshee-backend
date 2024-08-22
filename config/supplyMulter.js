import multer from "multer";
import { imageFileFilter, videoFileFilter } from "../utils/fileFilter.js";

const supplyMulter = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, 10 * 1024 * 1024); // 10 MB for images
      } else if (file.mimetype.startsWith("video/")) {
        cb(null, 100 * 1024 * 1024); // 100 MB for videos
      } else {
        cb(new Error("Invalid file type. Only images and videos are allowed."));
      }
    },
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      imageFileFilter(req, file, cb);
    } else if (file.mimetype.startsWith("video/")) {
      videoFileFilter(req, file, cb);
    } else {
      cb(new Error("Invalid file type. Only images and videos are allowed."));
    }
  },
}).fields([
  { name: "productImages", maxCount: 5 }, // Max 5 images
  { name: "productVideo", maxCount: 1 }, // Max 1 video
]);

export default supplyMulter;
