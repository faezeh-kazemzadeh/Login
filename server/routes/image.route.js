import express from "express";
import { verifyToken, authorize } from "../utils/verifyUser.js";
import { uploadMultipleImage } from "../controller/image.controller.js";


const router = express.Router();



router.post(
  "/upload/multiple",
  verifyToken,
  authorize(["Admin"]),
  // upload.array("files", 6),
  uploadMultipleImage
);

export default router;
