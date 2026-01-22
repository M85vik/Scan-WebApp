// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: "uploads/tmp",
//   filename: (_, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage,
//   limits: {
//     files: 5,
//     fileSize: 5 * 1024 * 1024,
//   },
//   fileFilter: (_, file, cb) => {
//     if (!file.mimetype.startsWith("image/")) {
//       cb(new Error("Only images allowed"));
//     }
//     cb(null, true);
//   },
// });

// export default upload;


import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/tmp",
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024 // 5MB per image
  }
});

export default upload;
