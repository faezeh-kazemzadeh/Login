import express from "express";
import { verifyToken, authorize } from "../utils/verifyUser.js";
import { uploadImage } from "../controller/image.controller.js";
import path from "path";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Define the file filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = ["image/jpeg", "image/png"];

  if (allowedTypes.includes(file.mimetype)) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error("Invalid file type. Only JPEG and PNG files are allowed."));
  }
};

const fileSizeLimit = 2 * 1024 * 1024; // 2 megabytes

const fileSizeValidator = (req, file, cb) => {
  if (file.size <= fileSizeLimit) {
    cb(null, true);
  } else {
    cb(new Error("File size exceeds the allowed limit of 2 megabytes."));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: fileSizeLimit },
});

// router.post('/upload',upload.array("images", 3),uploadImage)
router.post(
  "/upload",
  verifyToken,
  authorize(["Admin"]),
  upload.array("files", 6),uploadImage);

// , upload.array("images", 3)
export default router;
