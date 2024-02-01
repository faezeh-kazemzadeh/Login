import { Image } from "../models/Image.model.js";
import { errorHandler } from "../utils/error.js";
import path from "path";
import multer from "multer";
import fs from 'fs'
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
      const err = new Error(
        "Invalid file type. Only JPEG and PNG files are allowed."
      );
      err.name = "ExtensionError";
      cb(err);
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
        } else {
          return next(
            errorHandler(500, `Multer uploading error: ${err.message}`)
          );
        }
      } else if (err) {
        if (err.name == "ExtensionError") {
          return next(errorHandler(413, err.message));
        } else {
          return next(
            errorHandler(500, `Unknown uploading error: ${err.message}`)
          );
        }
      }

      if (!req.files || req.files.length === 0) {
        return next(errorHandler(400, "No files uploaded"));
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

      const savedFileUrls = savedFiles.map((savedFile) => {
        const { _id, name } = savedFile;
        return { _id, name };
      });

      if (savedFiles.length === req.files.length) {
        res.status(200).json({
          success: true,
          message: "Your files uploaded.",
          imageUrls: savedFileUrls,
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
export const remove=async(req,res,next)=>{
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return next(
        errorHandler(404, 'Image not found')
      )
    }

    fs.unlink(image.path, async(err) => {
      if (err) {
        return next(
          errorHandler(500, 'Error deleting image file')
        )
      }

      await Image.deleteOne({ _id: req.params.id });
      
      res.status(200).json({ success: true, _id: req.params.id });
    });
  } catch (error) {
    next(error);
  }
}