import Joi from 'joi'
import objectId from 'joi-objectid';
import mongoose from "mongoose";


Joi.objectId = objectId(Joi);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 250,
      required: true,
    },
    description: {
      type: String,
      minlength: 10,
      required: true,
    },
    category: {
      type: String,
      enum: ["Hair care", "Skin care" ,"Make-up"],
    },
    imageUrls: [{
      type: mongoose.Types.ObjectId,
      ref: 'Image',
    }],
    regularPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default:0
    },
    count:{
      type:Number,
      required:true
    },
    isPublished:{
      type:Boolean ,
      default:false
    }
  },
  { timestamps: true }
);

export const validate = (product)=>{
    const schema = Joi.object({
        name:Joi.string().min(5).max(250).required(),
        description:Joi.string().min(10).required(),
        regularPrice:Joi.number().required(),
        discount:Joi.number(),
        count:Joi.number().required(),
        category:Joi.string().valid("Hair care", "Skin care" ,"Make-up").required(),
        imageUrls:Joi.array().items(Joi.objectId()),
        isPublished: Joi.boolean()
    });
    return schema.validate(product)
}

export const Product = mongoose.model("Product", productSchema);

