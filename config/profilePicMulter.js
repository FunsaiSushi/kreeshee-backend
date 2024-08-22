import multer from "multer";
import { imageFileFilter } from "../utils/fileFilter.js";

const profilePicMulter = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter: imageFileFilter,
}).single("profilePic");

export default profilePicMulter;
