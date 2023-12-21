import Joi from 'joi'
import mongoose from "mongoose";
const imageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 250,
      required: true,
    }
  },
  { timestamps: true }
);

export const validate = (product)=>{
    const schema = Joi.object({
        name:Joi.string().min(5).max(250).required(),
        
    });
    return schema.validate(product)
}

export const Image = mongoose.model("Image", imageSchema);

