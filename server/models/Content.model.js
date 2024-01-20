import mongoose from "mongoose";
import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.ObjectId=ObjectId(Joi)
const contentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    imageUrls:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Image'
    }],
    isPublished:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
);

export const validate=(content)=>{
    const schema = Joi.object({
        title:Joi.string().min(5).required(),
        author:Joi.ObjectId().required(),
        body:Joi.string().min(10).required(),
        imageUrls:Joi.array().items(Joi.ObjectId()),
        isPublished:Joi.Boolean()
    })
    return schema.validate(content)
}

export const Content=mongoose.model('Content',contentSchema)
