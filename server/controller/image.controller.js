import { Image } from "../models/Image.model.js";

export const uploadImage = async (req, res, next) => {
  console.log(req.files)
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "No files uploaded",
      });
    }
    return res.status(200).json({ message: "Files uploaded successfully" });
  } catch (error) {
    next(error);
  }
};
