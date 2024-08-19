import multer from "multer";
import path from "path";

// File filter for images
const imageFileFilter = (file, cb) => {
  const imageTypes = /jpeg|jpg|png/;
  const extname = imageTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = imageTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png) are allowed"));
  }
};

// File filter for videos
const videoFileFilter = (file, cb) => {
  const videoTypes = /mp4|avi|mov/;
  const extname = videoTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = videoTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only videos (mp4, avi, mov) are allowed"));
  }
};

// Multer setup to handle multiple images and one video
const supplyMulter = multer({
  supplyStorage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      imageFileFilter(file, cb);
    } else if (file.mimetype.startsWith("video/")) {
      videoFileFilter(file, cb);
    } else {
      cb(new Error("Invalid file type. Only images and videos are allowed."));
    }
  },
}).fields([
  { name: "productImages", maxCount: 5 }, // Max 5 images
  { name: "productVideo", maxCount: 1 }, // Max 1 video
]);

export default supplyMulter;
