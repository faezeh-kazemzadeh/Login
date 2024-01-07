import { Image } from "../models/Image.model.js";
import { errorHandler } from "../utils/error.js";
import path from "path";
import multer from "multer";

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
const multi_upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error(
        "Invalid file type. Only JPEG and PNG files are allowed."
      );
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).array("files", 6);
export const uploadMultipleImage = async (req, res, next) => {
  try {
    multi_upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        if (err.message == "Unexpected field") {
          return next(
            errorHandler(422, `Multer uploading error: ${err.message}`)
          );
        } else
          return next(
            errorHandler(500, `Multer uploading error: ${err.message}`)
          );
      } else if (err) {
        if (err.name == "ExtensionError") {
          return next(errorHandler(413, err.message));
        } else {
          return next(
            errorHandler(500, `unknown uploading error: ${err.message}`)
          );
        }
      }
      if (!req.files || req.files.length === 0) {
        return next(errorHandler(400, "No files Uploaded"));
      }

      const savedFiles = await Promise.all(
        req.files.map((file) => {
          const image = new Image({
            name: file.filename,
            path: file.path,
          });
          return image.save();
        })
      );
console.log(savedFiles)
      const savedFileIds = savedFiles.map((savedFile) => savedFile._id );
      // console.log(savedFileIds , req.files);
      if (savedFileIds.length === req.files.length) {
        res
          .status(200)
          .json({
            success: true,
            message: "Your files uploaded.",
            imageUrls:savedFiles,
          });
      }
    });
  } catch (error) {
    next(error);
  }
};

export const remove=async(req,res,next)=>{
  try {
    console.log(req.params.id)
    await Image.findByIdAndDelete(req.params.id)
    res.status(200).json({success:true, })
  } catch (error) {
    next(error)
  }
}