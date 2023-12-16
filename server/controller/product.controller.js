import _ from "lodash";

import { Product, validate } from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

export const addProduct = async (req, res, next) => {
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
        "count"
      ])
    );
  res.status(201).send(product);

  } catch (error) {
    next(error);
  }
};

export const getAll = (req, res, next) => {
  res.send("oomadi be get all");
};
