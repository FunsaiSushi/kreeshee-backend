import multer from "multer";

// Memory storage for profile pictures
const profilePicStorage = multer.memoryStorage(); // Store profile pictures in memory as Buffer

// File type filtering for profile pictures
const profilePicFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/tiff",
  ]; // Add more allowed image formats as needed
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, GIF, TIFF and WebP files are allowed"));
  }
};

const profilePicMulter = multer({
  storage: profilePicStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 30 MB maximum file size
  },
  fileFilter: profilePicFileFilter,
}).single("profilePic");

export default profilePicMulter;
