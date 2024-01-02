import _ from "lodash";

import { Product, validate } from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

export const addProduct = async (req, res, next) => {
  console.log(req.body)
  const { error } = validate(req.body);
  if (error)
    if (error) return next(errorHandler(400, error.details[0].message));
  try {
    const product = await Product.create(
      _.pick(req.body, [
        "name",
        "description",
        "category",
        "imageUrls",
        "regularPrice",
        "discount",
        "count",
        "isPublished"
      ])
    );
  res.status(200).json({message: 'Product added successfully' , product});

  } catch (error) {
    next(error);
  }
};

export const getAll =async (req, res, next) => {
  try {
    const products = await Product
    .find()
    .populate('imageUrls','name -_id')
    .select('name category regularPrice imageUrls');
  res.send(products);

  } catch (error) {
    next(error)
  }
};
