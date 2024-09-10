import path from "path";

export const imageFileFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|gif|webp|tiff/; // Add more allowed types if needed
  const extname = imageTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = imageTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, gif, webp, tiff) are allowed"));
  }
};

// Utility function to filter video files
export const videoFileFilter = (req, file, cb) => {
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
