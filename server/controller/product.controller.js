import _ from "lodash";

import { Product, validate } from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

export const add = async (req, res, next) => {
  console.log(req.body)
  const { error } = validate(req.body);
 
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
  res.status(200).json({success:true ,message: 'Product added successfully' , product});

  } catch (error) {
    next(error);
  }
};

export const update=async(req,res,next)=>{
  const {_id, ...rest}= req.body;
  const {error} = validate(rest)
  if (error) return next(errorHandler(400, error.details[0].message));
  try {
  // const result =await Product.updateOne({_id},
    const product =await Product.findByIdAndUpdate({_id},
    _.pick(rest, [
      "name",
      "description",
      "category",
      "imageUrls",
      "regularPrice",
      "discount",
      "count",
      "isPublished"
    ])
    
  ,{new:true})
  console.log(product)
  res.json({success:true , product})
  
} catch (error) {
  next(error)
}
// res.json({success:true})
}
export const getAll =async (req, res, next) => {
  try {
    const products = await Product
    .find()
    .populate('imageUrls','name _id')
    .select('name category description regularPrice discount count imageUrls isPublished');
  res.send(products);

  } catch (error) {
    next(error)
  }
};
