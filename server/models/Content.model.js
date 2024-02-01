import mongoose from "mongoose";
import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId=objectId(Joi)
const contentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category'
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
        category:Joi.objectId().required(),
        author:Joi.objectId().required(),
        body:Joi.string().min(10).required(),
        imageUrls:Joi.array().items(Joi.objectId()),
        isPublished:Joi.boolean()
    })
    return schema.validate(content)
}

export const Content=mongoose.model('Content',contentSchema)
  