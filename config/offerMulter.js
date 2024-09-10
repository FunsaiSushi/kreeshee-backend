import multer from "multer";
import { imageFileFilter } from "../utils/fileFilter.js";

const offerMulter = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB for images
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      imageFileFilter(req, file, cb);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
}).fields([{ name: "productImages", maxCount: 5 }]); // Max 5 images

export default offerMulter;
